import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { perguntas } from "@/lib/jsonld";
import { dividirNoMeio, prepararArtigo } from "@/lib/html";
import type { Bloco } from "@/lib/tipos";

vi.mock("next/navigation", () => ({ usePathname: () => "/contato" }));

const { Blocos } = await import("./Blocos");
const { JsonLd } = await import("@/components/ui/JsonLd");

const hero: Bloco = { id: 1, tipo: "hero", dados: { titulo: "Sistemas sob medida", subtitulo: "Para o seu processo", selo: "", imagem: null, botoes: [{ rotulo: "Fale com a gente", url: "/contato", estilo: "primario" }, { rotulo: "Alcance", url: "https://alcance.exemplo/cadastro", estilo: "secundario" }] } };
const faq: Bloco = { id: 2, tipo: "faq", dados: { titulo: "Perguntas frequentes", itens: [{ pergunta: "Quanto custa?", resposta_html: "<p>Depende do <strong>escopo</strong>.</p>" }] } };

function html(blocos: Bloco[]) {
  return renderToStaticMarkup(<Blocos blocos={blocos} />);
}

describe("blocos de página", () => {
  it("o primeiro hero leva o único H1; um segundo hero vira H2", () => {
    const saida = html([hero, { ...hero, id: 9 }]);
    expect(saida.match(/<h1/g)).toHaveLength(1);
    expect(saida).toContain("<h2");
  });

  it("botão externo abre em nova aba com rel seguro; interno não", () => {
    const saida = html([hero]);
    expect(saida).toMatch(/href="https:\/\/alcance\.exemplo\/cadastro"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
    expect(saida).toMatch(/href="\/contato"(?![^>]*target)/);
  });

  it("bloco desconhecido é ignorado sem quebrar a página", () => {
    const saida = html([{ id: 3, tipo: "carrossel-3d", dados: {} }, faq]);
    expect(saida).toContain("Quanto custa?");
  });

  it("FAQ usa details/summary (sem JS) e gera FAQPage", () => {
    expect(html([faq])).toContain("<details>");
    expect(perguntas([faq])).toMatchObject({ "@type": "FAQPage", mainEntity: [{ name: "Quanto custa?", acceptedAnswer: { text: "Depende do escopo." } }] });
    expect(perguntas([hero])).toBeNull();
  });

  it("CTA, cards e texto renderizam com os dados do Gestão", () => {
    const saida = html([
      { id: 4, tipo: "cards", dados: { titulo: "O que fazemos", colunas: 3, cards: [{ icone: "robo", titulo: "Agentes de IA", texto: "Atendem", imagem: null, link: "/servicos/agentes-de-ia" }] } },
      { id: 5, tipo: "cta", dados: { titulo: "Vamos conversar?", texto: "", botoes: [{ rotulo: "Contato", url: "/contato", estilo: "primario" }] } },
      { id: 6, tipo: "texto_rico", dados: { titulo: "Como funciona", html: '<h2>Passo</h2><p>Veja <a href="https://prodosdigital.com.br/blog">o blog</a></p>' } },
    ]);
    expect(saida).toContain('href="/servicos/agentes-de-ia"');
    expect(saida).toContain("Vamos conversar?");
    expect(saida).toContain('id="como-funciona"');
    expect(saida).toContain('href="/blog"');
  });

  it("formulário tem honeypot escondido, consentimento obrigatório e rótulos", () => {
    const saida = html([{ id: 7, tipo: "formulario_contato", dados: { titulo: "Fale com a gente", texto: "" } }]);
    expect(saida).toMatch(/<label class="[^"]*isca[^"]*" aria-hidden="true">.*?<input[^>]*tabindex="-1"[^>]*name="site"/i);
    expect(saida).toMatch(/<input type="checkbox" required=""[^>]*name="consentimento"/);
    expect(saida).toContain("<span>E-mail *</span>");
  });

  it("logos de clientes sem itens não aparecem", () => {
    expect(html([{ id: 8, tipo: "logos_clientes", dados: { titulo: "Clientes", itens: [] } }])).toBe("");
  });
});

describe("tratamento do HTML do artigo", () => {
  it("dá ids únicos aos títulos e monta o sumário", () => {
    const { html: saida, sumario } = prepararArtigo("<h2>Introdução</h2><h3>Parte</h3><h2>Introdução</h2>");
    expect(sumario.map((s) => s.id)).toEqual(["introducao", "parte", "introducao-2"]);
    expect(saida).toContain('<h2 id="introducao-2">');
  });

  it("corta perto da metade só em artigos com 4 ou mais H2", () => {
    expect(dividirNoMeio("<h2>a</h2><h2>b</h2>")[1]).toBe("");
    const [antes, depois] = dividirNoMeio("<h2>1</h2><p>x</p><h2>2</h2><p>x</p><h2>3</h2><p>x</p><h2>4</h2><p>x</p>");
    expect(antes.length).toBeGreaterThan(0);
    expect(depois.startsWith("<h2>")).toBe(true);
  });

  it("JSON-LD não deixa o conteúdo fechar a tag script", () => {
    const saida = renderToStaticMarkup(<JsonLd dados={{ name: "</script><script>alert(1)</script>" }} />);
    expect(saida).not.toContain("</script><script>");
  });
});
