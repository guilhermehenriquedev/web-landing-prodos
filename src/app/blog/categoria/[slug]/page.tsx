import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ListaBlog } from "@/components/blog/ListaBlog";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

async function categoria(slug: string) {
  return (await siteApi.categorias()).find((c) => c.slug === slug && c.total_posts > 0) ?? null;
}

export async function generateStaticParams() {
  return (await siteApi.categorias()).filter((c) => c.total_posts > 0).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [config, atual] = await Promise.all([siteApi.config(), categoria(slug)]);
  if (!atual) return {};
  return metadados(config, {
    caminho: `/blog/categoria/${slug}`,
    titulo: `${atual.nome}: artigos do blog da Pródos | ${config.nome}`,
    descricao: atual.descricao || `Artigos da Pródos Digital sobre ${atual.nome.toLowerCase()}.`,
  });
}

export default async function CategoriaPagina({ params }: Props) {
  const { slug } = await params;
  const atual = await categoria(slug);
  if (!atual) notFound();
  const [lista, categorias] = await Promise.all([siteApi.posts({ categoria: slug }), siteApi.categorias()]);
  return (
    <ListaBlog
      titulo={atual.nome}
      descricao={atual.descricao}
      lista={lista}
      categorias={categorias}
      atual={slug}
      trilha={[{ nome: "Blog", url: "/blog" }, { nome: atual.nome, url: `/blog/categoria/${slug}` }]}
    />
  );
}
