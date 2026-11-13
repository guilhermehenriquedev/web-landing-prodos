import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GradePosts } from "@/components/blog/CardPost";
import { PaginaConteudo } from "@/components/paginas/PaginaConteudo";
import estilos from "@/components/paginas/paginas.module.scss";
import { Icone } from "@/components/ui/Icone";
import { JsonLd } from "@/components/ui/JsonLd";
import { aplicativo } from "@/lib/jsonld";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await siteApi.produtos()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [config, produto] = await Promise.all([siteApi.config(), siteApi.produto(slug)]);
  if (!produto) return {};
  return metadados(config, { caminho: produto.url, seo: produto.seo, imagem: produto.imagem });
}

export default async function ProdutoPagina({ params }: Props) {
  const { slug } = await params;
  const produto = await siteApi.produto(slug);
  if (!produto) notFound();
  const blocos = produto.blocos.length
    ? produto.blocos
    : [{ id: 0, tipo: "hero", dados: { titulo: produto.nome, subtitulo: produto.resumo, imagem: produto.imagem, botoes: [{ rotulo: produto.cta.rotulo, url: produto.cta.url, estilo: "primario" }] } }];
  // Se o artigo já tem um bloco de lista de posts, a seção automática repetiria os mesmos posts.
  const mostrarPosts = produto.posts_relacionados.length > 0 && !blocos.some((b) => b.tipo === "lista_posts");
  return (
    <>
      <PaginaConteudo
        titulo={produto.titulo}
        blocos={blocos}
        trilha={[{ nome: "Produtos", url: "/produtos" }, { nome: produto.nome, url: produto.url }]}
        depois={
          <>
            {mostrarPosts ? (
              <section className={estilos.secao} aria-labelledby="posts-do-produto">
                <div className={estilos.interno}>
                  <h2 id="posts-do-produto">Para aproveitar melhor o {produto.nome}</h2>
                  <GradePosts posts={produto.posts_relacionados.slice(0, 3)} />
                </div>
              </section>
            ) : null}
            {produto.servicos_relacionados.length ? (
              <section className={estilos.secao} aria-labelledby="servicos-do-produto">
                <div className={estilos.interno}>
                  <h2 id="servicos-do-produto">Precisa de algo sob medida?</h2>
                  <ul className={estilos.listaLinks}>
                    {produto.servicos_relacionados.map((servico) => (
                      <li key={servico.slug}>
                        <Link href={servico.url}>
                          {servico.titulo}
                          <Icone nome="seta" tamanho={18} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}
          </>
        }
      />
      <JsonLd dados={aplicativo(produto)} />
    </>
  );
}
