import { describe, expect, it, vi } from "vitest";

import { Idempotencia, assinar, verificarAviso } from "./revalidacao";

const SEGREDO = "segredo-de-teste";
const AGORA = 1_800_000_000;

function aviso(tags: string[] = ["post:campanhas", "posts", "sitemap"], id = "11111111-1111-1111-1111-111111111111") {
  const corpo = JSON.stringify({ id, tipo: "post", slug: "campanhas", tags });
  return { segredo: SEGREDO, corpo, timestamp: String(AGORA), assinatura: assinar(SEGREDO, String(AGORA), corpo), id, agora: AGORA };
}

describe("verificação do aviso do Gestão", () => {
  it("aceita aviso assinado e dentro da janela", () => {
    const resultado = verificarAviso(aviso());
    expect(resultado).toEqual({ ok: true, aviso: { id: aviso().id, tipo: "post", slug: "campanhas", tags: ["post:campanhas", "posts", "sitemap"] } });
  });

  it("usa o mesmo formato do Gestão (v1= + HMAC-SHA256 de timestamp.corpo)", () => {
    // Valor calculado em Python com a mesma fórmula de alcance_auth.assinar, do Gestão.
    expect(assinar("segredo", "1700000000", '{"id":"x"}')).toBe("v1=bc07feb0273031c6f9275ae37ef77b9f9e9505a98c9119dceea88a61609a17e5");
  });

  it("recusa assinatura errada, corpo alterado e segredo diferente", () => {
    expect(verificarAviso({ ...aviso(), assinatura: "v1=00" })).toMatchObject({ ok: false, status: 401 });
    expect(verificarAviso({ ...aviso(), corpo: aviso().corpo.replace("posts", "menu") })).toMatchObject({ ok: false, status: 401 });
    expect(verificarAviso({ ...aviso(), segredo: "outro" })).toMatchObject({ ok: false, status: 401 });
  });

  it("recusa fora da janela de 300 s, para os dois lados", () => {
    expect(verificarAviso({ ...aviso(), agora: AGORA + 301 })).toMatchObject({ ok: false, motivo: "fora da janela de 300 s" });
    expect(verificarAviso({ ...aviso(), agora: AGORA - 301 })).toMatchObject({ ok: false, motivo: "fora da janela de 300 s" });
    expect(verificarAviso({ ...aviso(), agora: AGORA + 300 }).ok).toBe(true);
  });

  it("sem segredo configurado responde 503 e sem cabeçalhos responde 401", () => {
    expect(verificarAviso({ ...aviso(), segredo: undefined })).toMatchObject({ ok: false, status: 503 });
    expect(verificarAviso({ ...aviso(), id: null })).toMatchObject({ ok: false, status: 401 });
  });

  it("id do cabeçalho tem que ser o do corpo", () => {
    expect(verificarAviso({ ...aviso(), id: "outro-id" })).toMatchObject({ ok: false, status: 400 });
  });

  it("descarta tags fora do formato esperado", () => {
    const resultado = verificarAviso(aviso(["post:ok", "post:../x", "qualquer", "pagina:Maiuscula", "site"]));
    expect(resultado.ok && resultado.aviso.tags).toEqual(["post:ok", "site"]);
  });
});

describe("idempotência", () => {
  it("o mesmo id só é processado uma vez dentro da janela", () => {
    const controle = new Idempotencia();
    expect(controle.jaProcessado("a", 0)).toBe(false);
    expect(controle.jaProcessado("a", 1000)).toBe(true);
    expect(controle.jaProcessado("b", 1000)).toBe(false);
    expect(controle.jaProcessado("a", 700_000)).toBe(false);
  });
});

describe("rota /api/revalidar", () => {
  it("revalida as tags uma vez e ignora a repetição", async () => {
    const revalidateTag = vi.fn();
    vi.doMock("next/cache", () => ({ revalidateTag }));
    process.env.GESTAO_REVALIDAR_SEGREDO = SEGREDO;
    const { POST } = await import("@/app/api/revalidar/route");
    const agora = String(Math.floor(Date.now() / 1000));
    const corpo = JSON.stringify({ id: "rota-1", tipo: "menu", slug: null, tags: ["menu", "sitemap"] });
    const pedido = () =>
      new Request("http://localhost/api/revalidar", {
        method: "POST",
        body: corpo,
        headers: { "X-Prodos-Timestamp": agora, "X-Prodos-Assinatura": assinar(SEGREDO, agora, corpo), "X-Prodos-Id": "rota-1" },
      });
    const primeira = await POST(pedido());
    expect(primeira.status).toBe(200);
    expect(revalidateTag.mock.calls).toEqual([["menu"], ["sitemap"]]);
    const segunda = await POST(pedido());
    expect(await segunda.json()).toEqual({ ok: true, repetido: true });
    expect(revalidateTag).toHaveBeenCalledTimes(2);

    const falsa = new Request("http://localhost/api/revalidar", { method: "POST", body: corpo, headers: { "X-Prodos-Timestamp": agora, "X-Prodos-Assinatura": "v1=0", "X-Prodos-Id": "rota-1" } });
    expect((await POST(falsa)).status).toBe(401);
  });
});
