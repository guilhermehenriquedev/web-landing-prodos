import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { conexao } = vi.hoisted(() => ({
  conexao: vi.fn(async () => {
    throw Object.assign(new Error("uso dinâmico"), { digest: "DYNAMIC_SERVER_USAGE" });
  }),
}));

vi.mock("next/server", () => ({ connection: conexao }));

import { GestaoIndisponivel, buscar, parametrosEstaticos, siteApi } from "./site-api";

const POST = { slug: "campanhas", titulo: "Campanhas no WhatsApp", tags: [] };

function resposta(status: number, corpo: unknown = {}) {
  return new Response(JSON.stringify(corpo), { status, headers: { "Content-Type": "application/json" } });
}

describe("cliente da API do Gestão", () => {
  let pasta: string;
  const fetchFalso = vi.fn<typeof fetch>();

  beforeEach(async () => {
    pasta = await mkdtemp(path.join(tmpdir(), "site-api-"));
    process.env.SITE_CACHE_DIR = pasta;
    process.env.GESTAO_API_URL = "https://api.exemplo/api/public/site/v2/";
    vi.stubGlobal("fetch", fetchFalso);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    conexao.mockClear();
    delete process.env.NEXT_PHASE;
  });

  afterEach(async () => {
    fetchFalso.mockReset();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete process.env.NEXT_PHASE;
    await rm(pasta, { recursive: true, force: true });
  });

  it("chama a URL certa com timeout e tags de cache por recurso", async () => {
    fetchFalso.mockResolvedValue(resposta(200, POST));
    await siteApi.post("campanhas");
    const [url, opcoes] = fetchFalso.mock.calls[0];
    expect(url).toBe("https://api.exemplo/api/public/site/v2/posts/campanhas/");
    expect(opcoes?.signal).toBeInstanceOf(AbortSignal);
    expect((opcoes as { next: { tags: string[]; revalidate: number } }).next).toEqual({ revalidate: 3600, tags: ["post:campanhas", "posts", "site"] });
  });

  it("monta filtros da lista de posts e escapa o slug", async () => {
    fetchFalso.mockImplementation(async () => resposta(200, { resultados: [] }));
    await siteApi.posts({ categoria: "sistemas", pagina: 2 });
    await siteApi.post("../config");
    expect(fetchFalso.mock.calls[0][0]).toBe("https://api.exemplo/api/public/site/v2/posts/?categoria=sistemas&pagina=2");
    expect(fetchFalso.mock.calls[1][0]).toBe("https://api.exemplo/api/public/site/v2/posts/..%2Fconfig/");
  });

  it("devolve null só quando a API responde 404", async () => {
    fetchFalso.mockResolvedValue(resposta(404, { detail: "Não encontrado." }));
    expect(await siteApi.post("nao-existe")).toBeNull();
  });

  it("com o Gestão fora, usa a última cópia boa", async () => {
    fetchFalso.mockResolvedValueOnce(resposta(200, POST));
    expect(await siteApi.post("campanhas")).toEqual(POST);
    expect(await readdir(pasta)).toHaveLength(1);

    fetchFalso.mockRejectedValueOnce(new TypeError("fetch failed"));
    expect(await siteApi.post("campanhas")).toEqual(POST);

    fetchFalso.mockResolvedValueOnce(resposta(502));
    expect(await siteApi.post("campanhas")).toEqual(POST);
  });

  it("timeout também cai na cópia", async () => {
    fetchFalso.mockResolvedValueOnce(resposta(200, POST));
    await siteApi.post("campanhas");
    fetchFalso.mockRejectedValueOnce(new DOMException("The operation was aborted due to timeout", "TimeoutError"));
    expect(await siteApi.post("campanhas")).toEqual(POST);
  });

  it("sem cópia e com o Gestão fora, lança erro (o Next mantém a página antiga) e nunca vira 404", async () => {
    fetchFalso.mockRejectedValue(new TypeError("fetch failed"));
    await expect(siteApi.post("campanhas")).rejects.toBeInstanceOf(GestaoIndisponivel);
    await expect(siteApi.config()).rejects.toBeInstanceOf(GestaoIndisponivel);
  });

  it("recurso essencial com 404 é tratado como falha, não como vazio", async () => {
    fetchFalso.mockImplementation(async () => resposta(404));
    await expect(siteApi.menu()).rejects.toBeInstanceOf(GestaoIndisponivel);
  });

  it("guarda a causa da rede na mensagem, não só fetch failed", async () => {
    const causa = Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:9"), { code: "ECONNREFUSED" });
    fetchFalso.mockRejectedValue(new TypeError("fetch failed", { cause: causa }));
    await expect(siteApi.paginas()).rejects.toThrow("fetch failed: connect ECONNREFUSED 127.0.0.1:9");
  });

  it("no build, sem o Gestão e sem cópia, a lista de rotas fica vazia", async () => {
    process.env.NEXT_PHASE = "phase-production-build";
    fetchFalso.mockRejectedValue(new TypeError("fetch failed", { cause: new Error("connect ECONNREFUSED 127.0.0.1:9") }));
    await expect(parametrosEstaticos(() => siteApi.paginas())).resolves.toEqual([]);
    expect(conexao).not.toHaveBeenCalled();
  });

  it("no build, a página adia a renderização em vez de falhar o deploy", async () => {
    process.env.NEXT_PHASE = "phase-production-build";
    fetchFalso.mockRejectedValue(new TypeError("fetch failed"));
    await expect(siteApi.config()).rejects.toMatchObject({ digest: "DYNAMIC_SERVER_USAGE" });
    expect(conexao).toHaveBeenCalledOnce();
  });

  it("erro alheio ao Gestão continua subindo na lista de rotas", async () => {
    await expect(
      parametrosEstaticos(() => {
        throw new Error("quebra");
      }),
    ).rejects.toThrow("quebra");
  });

  it("prévia não usa cache nem cópia", async () => {
    fetchFalso.mockResolvedValueOnce(resposta(200, { alvo: "post" }));
    await buscar("/previa/abc/", { tags: [], semCache: true });
    expect(fetchFalso.mock.calls[0][1]).toMatchObject({ cache: "no-store" });
    expect(await readdir(pasta)).toHaveLength(0);
    fetchFalso.mockRejectedValueOnce(new TypeError("fetch failed"));
    await expect(siteApi.previa("abc")).rejects.toBeInstanceOf(GestaoIndisponivel);
  });
});
