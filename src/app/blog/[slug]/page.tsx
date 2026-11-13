import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Artigo } from "@/components/blog/Artigo";
import { JsonLd } from "@/components/ui/JsonLd";
import { artigo } from "@/lib/jsonld";
import { metadados } from "@/lib/seo";
import { parametrosEstaticos, siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return parametrosEstaticos(async () => {
    const primeira = await siteApi.posts();
    const demais = await Promise.all(Array.from({ length: primeira.paginas - 1 }, (_, i) => siteApi.posts({ pagina: i + 2 })));
    return [primeira, ...demais].flatMap((lista) => lista.resultados.map((post) => ({ slug: post.slug })));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [config, post] = await Promise.all([siteApi.config(), siteApi.post(slug)]);
  if (!post) return {};
  return metadados(config, {
    caminho: post.url,
    seo: post.seo,
    imagem: post.capa,
    tipo: "article",
    publicadoEm: post.publicado_em,
    atualizadoEm: post.atualizado_em,
  });
}

export default async function PostPagina({ params }: Props) {
  const { slug } = await params;
  const [post, config] = await Promise.all([siteApi.post(slug), siteApi.config()]);
  if (!post) notFound();
  return (
    <>
      <Artigo post={post} />
      <JsonLd dados={artigo(post, config)} />
    </>
  );
}
