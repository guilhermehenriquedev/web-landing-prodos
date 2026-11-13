import Link from "next/link";

import { Imagem } from "@/components/ui/Imagem";
import { dataPorExtenso } from "@/lib/seo";
import type { ResumoPost } from "@/lib/tipos";

import estilos from "./blog.module.scss";

export function CardPost({ post, nivel = 3, prioridade = false }: { post: ResumoPost; nivel?: 2 | 3; prioridade?: boolean }) {
  const Titulo = nivel === 2 ? "h2" : "h3";
  return (
    <article className={`${estilos.card} surgir`}>
      {post.capa ? (
        <div className={estilos.capa}>
          <Imagem imagem={post.capa} sizes="(min-width: 1200px) 380px, (min-width: 600px) 50vw, 100vw" prioridade={prioridade} />
        </div>
      ) : null}
      <div className={estilos.cardCorpo}>
        {post.categoria ? <p className={estilos.categoria}>{post.categoria.nome}</p> : null}
        <Titulo className={estilos.cardTitulo}>
          <Link href={post.url} className={estilos.cardLink}>
            {post.titulo}
          </Link>
        </Titulo>
        <p className={estilos.resumo}>{post.resumo}</p>
        <p className={estilos.meta}>
          <time dateTime={post.publicado_em ?? undefined}>{dataPorExtenso(post.publicado_em)}</time>
          <span aria-hidden="true"> · </span>
          {post.tempo_leitura_min} min de leitura
        </p>
      </div>
    </article>
  );
}

export function GradePosts({ posts, nivel = 3 }: { posts: ResumoPost[]; nivel?: 2 | 3 }) {
  return (
    <div className={estilos.grade}>
      {posts.map((post, indice) => (
        <CardPost key={post.slug} post={post} nivel={nivel} prioridade={indice === 0 && nivel === 2} />
      ))}
    </div>
  );
}
