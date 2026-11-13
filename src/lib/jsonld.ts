import { absoluta, urlDoSite } from "./seo";
import type { Bloco, Config, Post, Produto } from "./tipos";
import { textoPuro } from "./html";

type Objeto = Record<string, unknown>;

const ID_ORGANIZACAO = () => `${urlDoSite()}/#organizacao`;

export function organizacao(config: Config): Objeto[] {
  const org: Objeto = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ID_ORGANIZACAO(),
    name: config.nome,
    url: urlDoSite(),
    description: config.descricao_curta || undefined,
    logo: config.logo?.url,
    email: config.contato.email ?? undefined,
    telephone: config.contato.telefone ?? undefined,
    sameAs: config.redes.map((r) => r.url),
    ...(config.razao_social ? { legalName: config.razao_social } : {}),
    ...(config.cnpj ? { taxID: config.cnpj } : {}),
  };
  const site: Objeto = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${urlDoSite()}/#site`,
    name: config.nome,
    url: urlDoSite(),
    inLanguage: "pt-BR",
    publisher: { "@id": ID_ORGANIZACAO() },
  };
  const lista = [org, site];
  const endereco = config.contato.endereco;
  // Negócio local só com endereço real cadastrado no Gestão (o mesmo do Perfil da Empresa no Google).
  if (endereco) {
    lista.push({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${urlDoSite()}/#negocio-local`,
      name: config.nome,
      url: urlDoSite(),
      image: config.logo?.url,
      telephone: config.contato.telefone ?? undefined,
      email: config.contato.email ?? undefined,
      areaServed: config.contato.area_atendida ?? undefined,
      parentOrganization: { "@id": ID_ORGANIZACAO() },
      address: {
        "@type": "PostalAddress",
        streetAddress: [endereco.logradouro, endereco.numero, endereco.complemento].filter(Boolean).join(", ") || undefined,
        addressLocality: endereco.cidade,
        addressRegion: endereco.uf,
        postalCode: endereco.cep ?? undefined,
        addressCountry: "BR",
      },
    });
  }
  return lista;
}

export function trilha(itens: { nome: string; url: string }[]): Objeto {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, indice) => ({ "@type": "ListItem", position: indice + 1, name: item.nome, item: absoluta(item.url) })),
  };
}

export function artigo(post: Post, config: Config): Objeto {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.seo.descricao || post.resumo,
    image: post.capa ? [post.capa.url] : undefined,
    datePublished: post.publicado_em ?? undefined,
    dateModified: post.atualizado_em,
    inLanguage: "pt-BR",
    mainEntityOfPage: absoluta(post.url),
    keywords: post.seo.palavra_chave ?? undefined,
    articleSection: post.categoria?.nome,
    author: post.autor ? { "@type": "Organization", name: post.autor.nome, url: urlDoSite() } : { "@id": ID_ORGANIZACAO() },
    publisher: { "@type": "Organization", name: config.nome, logo: config.logo ? { "@type": "ImageObject", url: config.logo.url } : undefined },
  };
}

export function aplicativo(produto: Produto): Objeto {
  // Sem preço nem avaliação: nada inventado. O cadastro do produto mostra os planos reais.
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: produto.nome,
    description: produto.seo.descricao || produto.resumo,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluta(produto.url),
    image: produto.imagem?.url,
    inLanguage: "pt-BR",
    publisher: { "@id": ID_ORGANIZACAO() },
  };
}

export function perguntas(blocos: Bloco[]): Objeto | null {
  const itens = blocos
    .filter((b) => b.tipo === "faq")
    .flatMap((b) => (b.dados.itens as { pergunta: string; resposta_html: string }[] | undefined) ?? []);
  if (!itens.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((item) => ({ "@type": "Question", name: item.pergunta, acceptedAnswer: { "@type": "Answer", text: textoPuro(item.resposta_html) } })),
  };
}
