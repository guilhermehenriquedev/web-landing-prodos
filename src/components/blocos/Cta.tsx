import { Botao } from "@/components/ui/Botao";

import type { DadosCta } from "./tipos";
import estilos from "./blocos.module.scss";

export function Cta({ dados }: { dados: DadosCta }) {
  return (
    <section className={estilos.secaoCta}>
      <div className={estilos.interno}>
        <div className={estilos.cta}>
          <div>
            <h2>{dados.titulo}</h2>
            {dados.texto ? <p>{dados.texto}</p> : null}
          </div>
          <div className={estilos.botoes}>
            {dados.botoes.map((botao, indice) => (
              <Botao key={botao.url + indice} url={botao.url} estilo={indice === 0 ? "inverso" : "secundario"} seta={indice === 0} tamanho="grande">
                {botao.rotulo}
              </Botao>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
