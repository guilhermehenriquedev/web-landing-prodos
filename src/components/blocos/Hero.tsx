import { Botao } from "@/components/ui/Botao";
import { Imagem } from "@/components/ui/Imagem";

import type { DadosHero } from "./tipos";
import estilos from "./blocos.module.scss";

type Props = { dados: DadosHero; principal: boolean; trilha?: React.ReactNode };

export function Hero({ dados, principal, trilha }: Props) {
  const Titulo = principal ? "h1" : "h2";
  return (
    <section className={estilos.hero}>
      <div className={`${estilos.heroInterno} ${dados.imagem ? estilos.heroComImagem : ""}`}>
        <div className={estilos.heroTexto}>
          {trilha}
          {dados.selo ? <p className={estilos.selo}>{dados.selo}</p> : null}
          <Titulo className={estilos.heroTitulo}>{dados.titulo}</Titulo>
          {dados.subtitulo ? <p className={estilos.heroSubtitulo}>{dados.subtitulo}</p> : null}
          {dados.botoes.length ? (
            <div className={estilos.botoes}>
              {dados.botoes.map((botao, indice) => (
                <Botao key={botao.url + indice} url={botao.url} estilo={botao.estilo === "primario" ? "primario" : "secundario"} seta={indice === 0} tamanho="grande">
                  {botao.rotulo}
                </Botao>
              ))}
            </div>
          ) : null}
        </div>
        {dados.imagem ? (
          <div className={estilos.heroImagem}>
            <Imagem imagem={dados.imagem} sizes="(min-width: 900px) 45vw, 100vw" prioridade />
          </div>
        ) : null}
      </div>
    </section>
  );
}
