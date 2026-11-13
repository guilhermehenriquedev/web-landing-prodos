import Link from "next/link";

import { GradePosts } from "@/components/blog/CardPost";
import { Icone } from "@/components/ui/Icone";
import { siteApi } from "@/lib/site-api";

import type { DadosListaPosts } from "./tipos";
import estilos from "./blocos.module.scss";

export async function ListaPosts({ dados }: { dados: DadosListaPosts }) {
  const lista = await siteApi.posts({ categoria: dados.categoria ?? undefined });
  const posts = lista.resultados.slice(0, dados.limite);
  if (!posts.length) return null;
  const verTodos = dados.categoria ? `/blog/categoria/${dados.categoria}` : "/blog";
  return (
    <section className={`${estilos.secao} ${estilos.suave}`}>
      <div className={estilos.interno}>
        <header className={`${estilos.cabecalhoSecao} ${estilos.cabecalhoComLink}`}>
          <h2 className={estilos.tituloSecao}>{dados.titulo || "Do blog"}</h2>
          <Link href={verTodos} className={estilos.verTodos}>
            Ver todos os posts <Icone nome="seta" tamanho={16} />
          </Link>
        </header>
        <GradePosts posts={posts} />
      </div>
    </section>
  );
}
