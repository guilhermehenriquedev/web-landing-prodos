import Link from "next/link";

import { Botao } from "@/components/ui/Botao";
import type { ResumoProduto } from "@/lib/tipos";

import estilos from "./blog.module.scss";

/** Chamada do produto dentro do artigo (no meio) e no fim. */
export function ChamadaProduto({ produto, variante }: { produto: ResumoProduto; variante: "meio" | "fim" }) {
  return (
    <aside className={`${estilos.chamada} ${variante === "fim" ? estilos.chamadaFim : ""}`} aria-label={`Conheça o ${produto.nome}`}>
      <div>
        <p className={estilos.chamadaRotulo}>{variante === "meio" ? "Produto da Pródos" : "Pronto para colocar em prática?"}</p>
        <p className={estilos.chamadaTitulo}>{produto.nome}</p>
        <p className={estilos.chamadaTexto}>{produto.resumo}</p>
      </div>
      <div className={estilos.chamadaAcoes}>
        <Botao url={produto.cta.url} estilo="inverso" seta>
          {produto.cta.rotulo}
        </Botao>
        <Link href={produto.url}>Ver como funciona</Link>
      </div>
    </aside>
  );
}

export function ChamadaContato() {
  return (
    <aside className={`${estilos.chamada} ${estilos.chamadaFim}`} aria-label="Fale com a Pródos">
      <div>
        <p className={estilos.chamadaRotulo}>Quer ajuda com isso?</p>
        <p className={estilos.chamadaTitulo}>Converse com a Pródos</p>
        <p className={estilos.chamadaTexto}>Conte o processo que você quer resolver. A primeira conversa é para entender o problema.</p>
      </div>
      <div className={estilos.chamadaAcoes}>
        <Botao url="/contato" estilo="inverso" seta>
          Fale com a gente
        </Botao>
        <Link href="/servicos/sistemas-sob-medida">Ver serviços</Link>
      </div>
    </aside>
  );
}
