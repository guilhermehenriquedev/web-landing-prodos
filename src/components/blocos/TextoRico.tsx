import { Prosa } from "@/components/ui/Prosa";
import { prepararArtigo, slugDoTexto } from "@/lib/html";

import type { DadosTexto } from "./tipos";
import estilos from "./blocos.module.scss";

export function TextoRico({ dados }: { dados: DadosTexto }) {
  const { html } = prepararArtigo(dados.html);
  return (
    <section className={`${estilos.secao} ${estilos.leitura}`} id={dados.titulo ? slugDoTexto(dados.titulo) : undefined}>
      <div className={estilos.interno}>
        {dados.titulo ? <h2 className={estilos.tituloSecao}>{dados.titulo}</h2> : null}
        <Prosa html={html} />
      </div>
    </section>
  );
}
