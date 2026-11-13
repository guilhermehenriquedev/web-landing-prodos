// O HTML já chega sanitizado pelo Gestão (lista fechada de tags). Aqui só ajustamos para a leitura.

export type ItemSumario = { id: string; texto: string; nivel: 2 | 3 };

export function slugDoTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function semTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/** Dá um id a cada H2/H3 (para o sumário e links diretos) e devolve a lista para o sumário. */
export function prepararArtigo(html: string): { html: string; sumario: ItemSumario[] } {
  const usados = new Set<string>();
  const sumario: ItemSumario[] = [];
  const comIds = html.replace(/<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g, (_, nivel: string, conteudo: string) => {
    const texto = semTags(conteudo);
    let id = slugDoTexto(texto) || "secao";
    for (let n = 2; usados.has(id); n++) id = `${slugDoTexto(texto)}-${n}`;
    usados.add(id);
    sumario.push({ id, texto, nivel: Number(nivel) as 2 | 3 });
    return `<h${nivel} id="${id}">${conteudo}</h${nivel}>`;
  });
  return { html: ajustarLinks(comIds), sumario };
}

/** Links para o próprio site viram relativos e sem noopener; externos abrem com segurança. */
export function ajustarLinks(html: string): string {
  return html.replace(/<a ([^>]*?)href="([^"]*)"([^>]*)>/g, (_, antes: string, href: string, depois: string) => {
    const interno = href.startsWith("/") || /^https?:\/\/(www\.)?prodosdigital\.com\.br/.test(href);
    const resto = `${antes}${depois}`.replace(/\s*rel="[^"]*"/g, "").replace(/\s*target="[^"]*"/g, "").trim();
    const destino = interno ? href.replace(/^https?:\/\/(www\.)?prodosdigital\.com\.br/, "") || "/" : href;
    const extra = interno ? "" : ' target="_blank" rel="noopener noreferrer"';
    return `<a ${resto ? `${resto} ` : ""}href="${destino}"${extra}>`;
  });
}

/**
 * Corta o artigo antes do H2 mais próximo da metade, para encaixar a chamada do produto no meio.
 * Artigos com menos de quatro H2 não são cortados.
 */
export function dividirNoMeio(html: string): [string, string] {
  const posicoes = [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index ?? 0);
  if (posicoes.length < 4) return [html, ""];
  const meio = html.length / 2;
  const corte = posicoes.reduce((melhor, atual) => (Math.abs(atual - meio) < Math.abs(melhor - meio) ? atual : melhor));
  return [html.slice(0, corte), html.slice(corte)];
}

export function textoPuro(html: string): string {
  return semTags(html).replace(/\s+/g, " ");
}
