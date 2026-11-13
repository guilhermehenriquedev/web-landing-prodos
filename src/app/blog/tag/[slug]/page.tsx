import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ListaBlog } from "@/components/blog/ListaBlog";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

async function tag(slug: string) {
  return (await siteApi.tags()).find((t) => t.slug === slug) ?? null;
}

export async function generateStaticParams() {
  return (await siteApi.tags()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [config, atual] = await Promise.all([siteApi.config(), tag(slug)]);
  if (!atual) return {};
  // Páginas de tag ajudam a navegar, mas repetem conteúdo das categorias: ficam fora do índice.
  return metadados(config, { caminho: `/blog/tag/${slug}`, titulo: `Artigos sobre ${atual.nome} | ${config.nome}`, descricao: `Posts do blog da Pródos com o assunto ${atual.nome}.`, noindex: true });
}

export default async function TagPagina({ params }: Props) {
  const { slug } = await params;
  const atual = await tag(slug);
  if (!atual) notFound();
  const [lista, categorias] = await Promise.all([siteApi.posts({ tag: slug }), siteApi.categorias()]);
  return (
    <ListaBlog
      titulo={`Assunto: ${atual.nome}`}
      lista={lista}
      categorias={categorias}
      trilha={[{ nome: "Blog", url: "/blog" }, { nome: atual.nome, url: `/blog/tag/${slug}` }]}
    />
  );
}
