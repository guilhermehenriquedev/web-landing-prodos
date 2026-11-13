import Link from "next/link";

import estilos from "@/components/paginas/paginas.module.scss";
import { Trilha } from "@/components/ui/Trilha";
import type { Categoria, ListaPosts } from "@/lib/tipos";

import { GradePosts } from "./CardPost";
import { Paginacao } from "./Paginacao";

type Props = {
  titulo: string;
  descricao?: string;
  lista: ListaPosts;
  categorias: Categoria[];
  atual?: string;
  trilha: { nome: string; url: string }[];
  base?: string;
};

export function ListaBlog({ titulo, descricao, lista, categorias, atual, trilha, base }: Props) {
  const comPosts = categorias.filter((c) => c.total_posts > 0);
  return (
    <>
      <header className={estilos.cabecalho}>
        <div className={estilos.interno}>
          <Trilha itens={trilha} tema="escuro" />
          <h1>{titulo}</h1>
          {descricao ? <p>{descricao}</p> : null}
        </div>
      </header>
      <section className={estilos.secao}>
        <div className={estilos.interno}>
          {comPosts.length > 1 ? (
            <nav aria-label="Categorias do blog">
              <ul className={estilos.filtros}>
                <li>
                  <Link href="/blog" aria-current={!atual ? "page" : undefined}>
                    Todos
                  </Link>
                </li>
                {comPosts.map((categoria) => (
                  <li key={categoria.slug}>
                    <Link href={`/blog/categoria/${categoria.slug}`} aria-current={atual === categoria.slug ? "page" : undefined}>
                      {categoria.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {lista.resultados.length ? <GradePosts posts={lista.resultados} nivel={2} /> : <p className={estilos.vazio}>Nenhum post publicado ainda.</p>}
          {base ? <Paginacao atual={lista.pagina} total={lista.paginas} base={base} /> : null}
        </div>
      </section>
    </>
  );
}
