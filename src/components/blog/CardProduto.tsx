import Link from "next/link";

import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Imagem } from "@/components/ui/Imagem";
import type { ResumoProduto } from "@/lib/tipos";

import estilos from "./blog.module.scss";

export function CardProduto({ produto, nivel = 3 }: { produto: ResumoProduto; nivel?: 2 | 3 }) {
  const Titulo = nivel === 2 ? "h2" : "h3";
  return (
    <article className={estilos.produto}>
      {produto.imagem ? (
        <div className={estilos.capa}>
          <Imagem imagem={produto.imagem} sizes="(min-width: 900px) 520px, 100vw" />
        </div>
      ) : null}
      <div className={estilos.cardCorpo}>
        <Titulo className={estilos.cardTitulo}>{produto.nome}</Titulo>
        <p className={estilos.resumo}>{produto.resumo}</p>
        <div className={estilos.acoesProduto}>
          <Botao url={produto.cta.url} seta>
            {produto.cta.rotulo}
          </Botao>
          <Link href={produto.url} className={estilos.saibaMais}>
            Conheça o {produto.nome} <Icone nome="seta" tamanho={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
