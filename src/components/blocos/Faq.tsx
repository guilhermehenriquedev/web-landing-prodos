import { Icone } from "@/components/ui/Icone";
import { Prosa } from "@/components/ui/Prosa";
import { ajustarLinks } from "@/lib/html";

import type { DadosFaq } from "./tipos";
import estilos from "./blocos.module.scss";

/** details/summary: abre e fecha sem JavaScript. O FAQPage em JSON-LD sai na página. */
export function Faq({ dados }: { dados: DadosFaq }) {
  return (
    <section className={`${estilos.secao} ${estilos.leitura}`} id="perguntas-frequentes">
      <div className={estilos.interno}>
        <h2 className={estilos.tituloSecao}>{dados.titulo}</h2>
        <div className={estilos.faq}>
          {dados.itens.map((item) => (
            <details key={item.pergunta}>
              <summary>
                <span>{item.pergunta}</span>
                <Icone nome="descer" tamanho={20} />
              </summary>
              <Prosa html={ajustarLinks(item.resposta_html)} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
