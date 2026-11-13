import { NextResponse, type NextRequest } from "next/server";

type Redirecionamento = { origem: string; destino: string };

const VIDA_MS = 60_000;
let cache: { mapa: Map<string, string>; ate: number } | null = null;

async function redirecionamentos(): Promise<Map<string, string>> {
  if (cache && cache.ate > Date.now()) return cache.mapa;
  const base = (process.env.GESTAO_API_URL ?? "http://localhost:8000/api/public/site/v2").replace(/\/$/, "");
  try {
    const resposta = await fetch(`${base}/redirecionamentos/`, { signal: AbortSignal.timeout(2000), cache: "no-store" });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const lista = (await resposta.json()) as Redirecionamento[];
    cache = { mapa: new Map(lista.map((r) => [r.origem.replace(/\/$/, "") || "/", r.destino])), ate: Date.now() + VIDA_MS };
  } catch {
    // Gestão fora: segue com a última lista conhecida (ou nenhuma) e tenta de novo em 1 minuto.
    cache = { mapa: cache?.mapa ?? new Map(), ate: Date.now() + VIDA_MS };
  }
  return cache.mapa;
}

/** 301 dos endereços antigos cadastrados no Gestão (aba SEO e configurações). */
export async function middleware(pedido: NextRequest) {
  const caminho = pedido.nextUrl.pathname.replace(/\/$/, "") || "/";
  const destino = (await redirecionamentos()).get(caminho);
  if (!destino) return NextResponse.next();
  const url = destino.startsWith("http") ? new URL(destino) : new URL(destino, pedido.url);
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next/|api/|img/|favicon|apple-touch|android-chrome|site\\.webmanifest|sitemap\\.xml|robots\\.txt|previa).*)"],
};
