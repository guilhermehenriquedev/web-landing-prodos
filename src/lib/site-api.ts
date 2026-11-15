import { AsyncLocalStorage } from "node:async_hooks";
import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  Categoria,
  Config,
  ItemMenu,
  ItemSitemap,
  ListaPosts,
  Pagina,
  Post,
  Previa,
  Produto,
  Redirecionamento,
  ResumoPagina,
  ResumoProduto,
  Tag,
  Vaga,
} from "./tipos";

/** Uma hora de vida no cache; o aviso do Gestão invalida antes, na hora em que algo muda. */
export const REVALIDAR_SEGUNDOS = 3600;

export class GestaoIndisponivel extends Error {
  constructor(caminho: string, motivo: string) {
    super(`Gestão indisponível em ${caminho}: ${motivo}`);
    this.name = "GestaoIndisponivel";
  }
}

function baseDaApi(): string {
  return (process.env.GESTAO_API_URL ?? "http://localhost:8000/api/public/site/v2").replace(/\/$/, "");
}

function pastaDaCopia(): string {
  return process.env.SITE_CACHE_DIR ?? path.join(process.cwd(), ".next", "cache", "gestao");
}

function arquivoDaCopia(caminho: string): string {
  return path.join(pastaDaCopia(), `${createHash("sha256").update(caminho).digest("hex").slice(0, 32)}.json`);
}

async function guardarCopia(caminho: string, dados: unknown): Promise<void> {
  const destino = arquivoDaCopia(caminho);
  try {
    await mkdir(path.dirname(destino), { recursive: true });
    // Grava num temporário e renomeia: uma leitura concorrente nunca pega o arquivo pela metade.
    const temporario = `${destino}.${process.pid}.tmp`;
    await writeFile(temporario, JSON.stringify(dados));
    await rename(temporario, destino);
  } catch {
    // Sem disco para a cópia, o site só perde a reserva; a resposta atual segue normal.
  }
}

async function lerCopia<T>(caminho: string): Promise<T | undefined> {
  try {
    return JSON.parse(await readFile(arquivoDaCopia(caminho), "utf8")) as T;
  } catch {
    return undefined;
  }
}

type Opcoes = { tags: string[]; semCache?: boolean };

// generateStaticParams roda no mesmo processo que o prerender. O contexto separa os dois:
// na lista de rotas o erro vira []; na página, o build adia a renderização.
const coletaDeRotas = new AsyncLocalStorage<true>();

function detalheDaFalha(erro: unknown): string {
  if (!(erro instanceof Error)) return "falha de rede";
  const causa = erro.cause;
  if (causa instanceof AggregateError) {
    const textos = causa.errors.map((item) => (item instanceof Error ? item.message : String(item))).filter(Boolean);
    return textos.length ? `${erro.message}: ${textos.join("; ")}` : erro.message;
  }
  if (causa instanceof Error) {
    const codigo = "code" in causa && typeof causa.code === "string" ? causa.code : "";
    const texto = codigo && !causa.message.includes(codigo) ? `${codigo} ${causa.message}` : causa.message;
    return texto ? `${erro.message}: ${texto}` : erro.message;
  }
  return erro.message;
}

/**
 * Busca no Gestão. Devolve `null` só quando a API diz que não existe (404).
 * Se o Gestão cair ou demorar, usa a última cópia boa. Sem cópia, no ar o Next
 * mantém a página já gerada; no build não existe essa página, então a falha não
 * pode derrubar o deploy.
 */
export async function buscar<T>(caminho: string, { tags, semCache = false }: Opcoes): Promise<T | null> {
  const timeout = Number(process.env.GESTAO_API_TIMEOUT_MS ?? 4000);
  let resposta: Response;
  try {
    resposta = await fetch(`${baseDaApi()}${caminho}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(timeout),
      ...(semCache ? { cache: "no-store" as const } : { next: { revalidate: REVALIDAR_SEGUNDOS, tags: [...tags, "site"] } }),
    });
  } catch (erro) {
    return reserva<T>(caminho, detalheDaFalha(erro), semCache);
  }
  if (resposta.status === 404) return null;
  if (!resposta.ok) return reserva<T>(caminho, `HTTP ${resposta.status}`, semCache);
  const dados = (await resposta.json()) as T;
  if (!semCache) await guardarCopia(caminho, dados);
  return dados;
}

async function reserva<T>(caminho: string, motivo: string, semCache: boolean): Promise<T> {
  const copia = semCache ? undefined : await lerCopia<T>(caminho);
  if (copia !== undefined) {
    console.warn(`[site-api] ${caminho}: ${motivo}; usando a última cópia.`);
    return copia;
  }
  // Fora da coleta de rotas, connection() faz o Next marcar a página como dinâmica
  // (revalidate 0) em vez de abortar o build. No pedido ela é renderizada de novo.
  if (process.env.NEXT_PHASE === "phase-production-build" && !coletaDeRotas.getStore()) {
    const { connection } = await import("next/server");
    await connection();
  }
  throw new GestaoIndisponivel(caminho, motivo);
}

export async function parametrosEstaticos<T>(carregar: () => Promise<T[]>): Promise<T[]> {
  try {
    return await coletaDeRotas.run(true, carregar);
  } catch (erro) {
    if (erro instanceof GestaoIndisponivel) {
      console.warn(`[site-api] ${erro.message}. O build segue sem estas rotas; elas nascem no primeiro acesso.`);
      return [];
    }
    throw erro;
  }
}

async function obrigatorio<T>(caminho: string, tags: string[]): Promise<T> {
  const dados = await buscar<T>(caminho, { tags });
  if (dados === null) throw new GestaoIndisponivel(caminho, "recurso essencial respondeu 404");
  return dados;
}

const seguro = (slug: string) => encodeURIComponent(slug);

export const siteApi = {
  config: () => obrigatorio<Config>("/config/", ["config"]),
  menu: () => obrigatorio<ItemMenu[]>("/menu/", ["menu"]),
  paginas: () => obrigatorio<ResumoPagina[]>("/paginas/", ["paginas"]),
  pagina: (slug: string) => buscar<Pagina>(`/paginas/${seguro(slug)}/`, { tags: [`pagina:${slug}`] }),
  posts: (filtros: { categoria?: string; tag?: string; produto?: string; pagina?: number } = {}) => {
    const busca = new URLSearchParams();
    for (const [chave, valor] of Object.entries(filtros)) if (valor) busca.set(chave, String(valor));
    const consulta = busca.toString();
    return obrigatorio<ListaPosts>(`/posts/${consulta ? `?${consulta}` : ""}`, ["posts"]);
  },
  post: (slug: string) => buscar<Post>(`/posts/${seguro(slug)}/`, { tags: [`post:${slug}`, "posts"] }),
  categorias: () => obrigatorio<Categoria[]>("/categorias/", ["categorias", "posts"]),
  tags: () => obrigatorio<Tag[]>("/tags/", ["categorias", "posts"]),
  produtos: () => obrigatorio<ResumoProduto[]>("/produtos/", ["produtos"]),
  produto: (slug: string) => buscar<Produto>(`/produtos/${seguro(slug)}/`, { tags: [`produto:${slug}`, "produtos"] }),
  redirecionamentos: () => obrigatorio<Redirecionamento[]>("/redirecionamentos/", ["redirecionamentos"]),
  vagas: () => obrigatorio<Vaga[]>("/vagas/", ["vagas"]),
  sitemap: () => obrigatorio<ItemSitemap[]>("/sitemap/", ["sitemap"]),
  previa: (token: string) => buscar<Previa>(`/previa/${seguro(token)}/`, { tags: [], semCache: true }),
};
