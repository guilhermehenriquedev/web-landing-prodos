import type { Metadata } from "next";

import type { Config, Imagem, Seo } from "./tipos";

export function urlDoSite(): string {
  return (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function absoluta(caminho: string): string {
  if (/^https?:\/\//.test(caminho)) return caminho;
  return `${urlDoSite()}${caminho === "/" ? "" : caminho}` || urlDoSite();
}

type Entrada = {
  caminho: string;
  seo?: Seo | null;
  titulo?: string;
  descricao?: string;
  imagem?: Imagem | null;
  tipo?: "website" | "article";
  publicadoEm?: string | null;
  atualizadoEm?: string | null;
  noindex?: boolean;
};

export function metadados(config: Config, entrada: Entrada): Metadata {
  const titulo = entrada.seo?.titulo || entrada.titulo || config.seo_padrao.titulo;
  const descricao = entrada.seo?.descricao || entrada.descricao || config.seo_padrao.descricao;
  const imagem = entrada.seo?.imagem_og ?? entrada.imagem ?? config.seo_padrao.imagem_og;
  const canonical = entrada.seo?.canonical || absoluta(entrada.caminho);
  const noindex = entrada.noindex || entrada.seo?.noindex;
  const imagens = imagem ? [{ url: imagem.url, width: imagem.largura, height: imagem.altura, alt: imagem.alt }] : undefined;
  return {
    title: { absolute: titulo },
    description: descricao,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: entrada.tipo ?? "website",
      locale: "pt_BR",
      siteName: config.nome,
      url: canonical,
      title: titulo,
      description: descricao,
      images: imagens,
      ...(entrada.tipo === "article"
        ? { publishedTime: entrada.publicadoEm ?? undefined, modifiedTime: entrada.atualizadoEm ?? undefined }
        : {}),
    },
    twitter: { card: imagem ? "summary_large_image" : "summary", title: titulo, description: descricao, images: imagem ? [imagem.url] : undefined },
  };
}

export function linkWhatsApp(numero: string | null, texto?: string): string | null {
  if (!numero) return null;
  return `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;
}

export function dataPorExtenso(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Fortaleza" }).format(new Date(iso));
}
