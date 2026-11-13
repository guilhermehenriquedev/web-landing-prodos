import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PaginaConteudo } from "@/components/paginas/PaginaConteudo";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

async function hub() {
  const resumo = (await siteApi.paginas()).find((p) => p.tipo === "hub_produtos");
  return resumo ? siteApi.pagina(resumo.slug) : null;
}

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([siteApi.config(), hub()]);
  return metadados(config, { caminho: "/produtos", seo: pagina?.seo, titulo: "Produtos" });
}

export default async function Produtos() {
  const pagina = await hub();
  if (!pagina) notFound();
  return <PaginaConteudo titulo={pagina.titulo} blocos={pagina.blocos} trilha={[{ nome: "Produtos", url: "/produtos" }]} />;
}
