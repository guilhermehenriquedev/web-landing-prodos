import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import { Imagem } from "@/components/ui/Imagem";
import { slugDoTexto } from "@/lib/html";

import type { DadosCards } from "./tipos";
import estilos from "./blocos.module.scss";

export function Cards({ dados }: { dados: DadosCards }) {
  return (
    <section className={`${estilos.secao} ${estilos.suave}`} id={dados.titulo ? slugDoTexto(dados.titulo) : undefined}>
      <div className={estilos.interno}>
        {dados.titulo ? (
          <header className={estilos.cabecalhoSecao}>
            <h2 className={estilos.tituloSecao}>{dados.titulo}</h2>
            {dados.subtitulo ? <p>{dados.subtitulo}</p> : null}
          </header>
        ) : null}
        <ul className={estilos.grade} data-colunas={dados.colunas}>
          {dados.cards.map((card) => {
            const conteudo = (
              <>
                {card.imagem ? (
                  <Imagem imagem={card.imagem} sizes="(min-width: 900px) 33vw, 100vw" className={estilos.cardImagem} />
                ) : card.icone ? (
                  <span className={estilos.cardIcone}>
                    <Icone nome={card.icone} />
                  </span>
                ) : null}
                <h3>{card.titulo}</h3>
                {card.texto ? <p>{card.texto}</p> : null}
                {card.link ? (
                  <span className={estilos.cardMais}>
                    Saiba mais <Icone nome="seta" tamanho={16} />
                  </span>
                ) : null}
              </>
            );
            return (
              <li key={card.titulo} className={`${estilos.card} surgir`}>
                {card.link ? (
                  <Link href={card.link} className={estilos.cardLink}>
                    {conteudo}
                  </Link>
                ) : (
                  conteudo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
