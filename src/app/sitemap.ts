import type { MetadataRoute } from "next";

import { absoluta } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const itens = await siteApi.sitemap();
  return itens.map((item) => ({
    url: absoluta(item.url),
    lastModified: item.atualizado_em ? new Date(item.atualizado_em) : undefined,
    changeFrequency: item.tipo === "post" ? "monthly" : "weekly",
    priority: item.url === "/" ? 1 : item.tipo === "produto" || item.tipo === "pagina" ? 0.8 : 0.6,
  }));
}
