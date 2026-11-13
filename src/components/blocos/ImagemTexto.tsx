import { Botao } from "@/components/ui/Botao";
import { Imagem } from "@/components/ui/Imagem";
import { Prosa } from "@/components/ui/Prosa";
import { ajustarLinks } from "@/lib/html";

import type { DadosImagemTexto } from "./tipos";
import estilos from "./blocos.module.scss";

export function ImagemTexto({ dados }: { dados: DadosImagemTexto }) {
  return (
    <section className={`${estilos.secao} ${estilos.leitura}`}>
      <div className={`${estilos.interno} ${estilos.imagemTexto} ${dados.posicao === "esquerda" ? estilos.imagemAEsquerda : ""}`}>
        <div>
          {dados.titulo ? <h2 className={estilos.tituloSecao}>{dados.titulo}</h2> : null}
          <Prosa html={ajustarLinks(dados.texto_html)} />
          {dados.botoes.length ? (
            <div className={estilos.botoes}>
              {dados.botoes.map((botao) => (
                <Botao key={botao.url} url={botao.url} estilo={botao.estilo === "primario" ? "primario" : "claro"}>
                  {botao.rotulo}
                </Botao>
              ))}
            </div>
          ) : null}
        </div>
        {dados.imagem ? (
          <div className={estilos.moldura}>
            <Imagem imagem={dados.imagem} sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
