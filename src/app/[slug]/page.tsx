import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PaginaConteudo } from "@/components/paginas/PaginaConteudo";
import { metadados } from "@/lib/seo";
import { parametrosEstaticos, siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

async function paginaLivre(slug: string) {
  const pagina = await siteApi.pagina(slug);
  // Serviços e a home têm endereço próprio; aqui só entram as páginas livres.
  return pagina?.tipo === "livre" ? pagina : null;
}

export function generateStaticParams() {
  return parametrosEstaticos(async () => {
    const paginas = await siteApi.paginas();
    return paginas.filter((p) => p.tipo === "livre").map((p) => ({ slug: p.slug }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [config, pagina] = await Promise.all([siteApi.config(), paginaLivre(slug)]);
  if (!pagina) return {};
  return metadados(config, { caminho: pagina.url, seo: pagina.seo });
}

export default async function PaginaLivre({ params }: Props) {
  const { slug } = await params;
  const pagina = await paginaLivre(slug);
  if (!pagina) notFound();
  return <PaginaConteudo titulo={pagina.titulo} blocos={pagina.blocos} trilha={[{ nome: pagina.titulo, url: pagina.url }]} />;
}
