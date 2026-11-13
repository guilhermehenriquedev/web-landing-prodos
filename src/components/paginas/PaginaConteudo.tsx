import { Blocos, temHero } from "@/components/blocos/Blocos";
import { CardProduto } from "@/components/blog/CardProduto";
import { JsonLd } from "@/components/ui/JsonLd";
import { Trilha } from "@/components/ui/Trilha";
import { perguntas } from "@/lib/jsonld";
import type { Bloco, ResumoProduto } from "@/lib/tipos";

import estilos from "./paginas.module.scss";

type Props = {
  titulo: string;
  blocos: Bloco[];
  trilha?: { nome: string; url: string }[];
  produtoRelacionado?: ResumoProduto | null;
  depois?: React.ReactNode;
};

/** Página feita de blocos. Sem bloco de destaque, o título vira o H1 num cabeçalho simples. */
export function PaginaConteudo({ titulo, blocos, trilha, produtoRelacionado, depois }: Props) {
  const navegacao = trilha?.length ? <Trilha itens={trilha} tema="escuro" /> : null;
  return (
    <>
      {temHero(blocos) ? null : (
        <header className={estilos.cabecalho}>
          <div className={estilos.interno}>
            {navegacao}
            <h1>{titulo}</h1>
          </div>
        </header>
      )}
      <Blocos blocos={blocos} trilha={temHero(blocos) ? navegacao : undefined} />
      {produtoRelacionado ? (
        <section className={estilos.relacionado} aria-labelledby="produto-relacionado">
          <div className={estilos.interno}>
            <h2 id="produto-relacionado">Produto relacionado</h2>
            <CardProduto produto={produtoRelacionado} />
          </div>
        </section>
      ) : null}
      {depois}
      <JsonLd dados={perguntas(blocos)} />
    </>
  );
}
