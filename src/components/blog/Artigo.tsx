import Link from "next/link";

import { Imagem } from "@/components/ui/Imagem";
import { Prosa } from "@/components/ui/Prosa";
import { Trilha } from "@/components/ui/Trilha";
import { dividirNoMeio, prepararArtigo } from "@/lib/html";
import { absoluta, dataPorExtenso } from "@/lib/seo";
import type { Post } from "@/lib/tipos";

import { GradePosts } from "./CardPost";
import { ChamadaContato, ChamadaProduto } from "./ChamadaProduto";
import { Compartilhar } from "./Compartilhar";
import { SumarioLateral, SumarioMovel } from "./Sumario";
import estilos from "./blog.module.scss";

export function Artigo({ post }: { post: Post }) {
  const { html, sumario } = prepararArtigo(post.corpo_html);
  const [primeiraParte, segundaParte] = post.produto_relacionado ? dividirNoMeio(html) : [html, ""];
  const trilha = [{ nome: "Blog", url: "/blog" }];
  if (post.categoria) trilha.push({ nome: post.categoria.nome, url: `/blog/categoria/${post.categoria.slug}` });
  trilha.push({ nome: post.titulo, url: post.url });

  return (
    <article className={estilos.artigo}>
      <header className={estilos.cabecalhoArtigo}>
        <div className={estilos.cabecalhoInterno}>
          <Trilha itens={trilha} tema="escuro" />
          {post.categoria ? (
            <Link href={`/blog/categoria/${post.categoria.slug}`} className={estilos.categoriaEscura}>
              {post.categoria.nome}
            </Link>
          ) : null}
          <h1>{post.titulo}</h1>
          <p className={estilos.linhaFina}>{post.resumo}</p>
          <p className={estilos.metaEscura}>
            {post.autor ? <span>Por {post.autor.nome}</span> : null}
            <time dateTime={post.publicado_em ?? undefined}>{dataPorExtenso(post.publicado_em)}</time>
            <span>{post.tempo_leitura_min} min de leitura</span>
          </p>
        </div>
      </header>

      <div className={estilos.corpoArtigo}>
        {post.capa ? (
          <div className={estilos.capaArtigo}>
            <Imagem imagem={post.capa} sizes="(min-width: 1200px) 1100px, 100vw" prioridade />
          </div>
        ) : null}
        <div className={estilos.colunas}>
          <div className={estilos.textoArtigo}>
            <SumarioMovel itens={sumario} />
            <Prosa html={primeiraParte} />
            {post.produto_relacionado && segundaParte ? <ChamadaProduto produto={post.produto_relacionado} variante="meio" /> : null}
            {segundaParte ? <Prosa html={segundaParte} /> : null}

            {post.tags.length ? (
              <ul className={estilos.tags} aria-label="Assuntos">
                {post.tags.map((tag) => (
                  <li key={tag.slug}>
                    <Link href={`/blog/tag/${tag.slug}`}>#{tag.nome}</Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <Compartilhar url={absoluta(post.url)} titulo={post.titulo} />
            {post.produto_relacionado ? <ChamadaProduto produto={post.produto_relacionado} variante="fim" /> : <ChamadaContato />}
          </div>
          <SumarioLateral itens={sumario} />
        </div>
      </div>

      {post.relacionados.length ? (
        <section className={estilos.relacionados} aria-labelledby="leia-tambem">
          <div className={estilos.relacionadosInterno}>
            <h2 id="leia-tambem">Leia também</h2>
            <GradePosts posts={post.relacionados} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
