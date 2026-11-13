import type { Metadata } from "next";

import { ListaBlog } from "@/components/blog/ListaBlog";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

const DESCRICAO = "Artigos sobre sistemas sob medida, automação de processos, agentes de IA e vendas pelo WhatsApp, escritos pela equipe da Pródos Digital.";

export async function generateMetadata(): Promise<Metadata> {
  const config = await siteApi.config();
  return metadados(config, { caminho: "/blog", titulo: `Blog da Pródos: sistemas, IA e automação | ${config.nome}`, descricao: DESCRICAO });
}

export default async function Blog() {
  const [lista, categorias] = await Promise.all([siteApi.posts(), siteApi.categorias()]);
  return <ListaBlog titulo="Blog" descricao={DESCRICAO} lista={lista} categorias={categorias} trilha={[{ nome: "Blog", url: "/blog" }]} base="/blog" />;
}
