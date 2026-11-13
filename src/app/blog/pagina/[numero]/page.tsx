import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { ListaBlog } from "@/components/blog/ListaBlog";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ numero: string }> };

export async function generateStaticParams() {
  const { paginas } = await siteApi.posts();
  return Array.from({ length: Math.max(0, paginas - 1) }, (_, i) => ({ numero: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { numero } = await params;
  const config = await siteApi.config();
  return metadados(config, { caminho: `/blog/pagina/${numero}`, titulo: `Blog, página ${numero} | ${config.nome}`, descricao: "Mais artigos da Pródos Digital sobre sistemas, IA e automação." });
}

export default async function BlogPaginado({ params }: Props) {
  const numero = Number((await params).numero);
  if (numero === 1) permanentRedirect("/blog");
  if (!Number.isInteger(numero) || numero < 1) notFound();
  const [lista, categorias] = await Promise.all([siteApi.posts({ pagina: numero }), siteApi.categorias()]);
  if (numero > lista.paginas) notFound();
  return <ListaBlog titulo={`Blog, página ${numero}`} lista={lista} categorias={categorias} trilha={[{ nome: "Blog", url: "/blog" }, { nome: `Página ${numero}`, url: `/blog/pagina/${numero}` }]} base="/blog" />;
}
