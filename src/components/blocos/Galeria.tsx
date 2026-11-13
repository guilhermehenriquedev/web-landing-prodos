import { Imagem } from "@/components/ui/Imagem";

import type { DadosGaleria, DadosLogos } from "./tipos";
import estilos from "./blocos.module.scss";

export function Galeria({ dados }: { dados: DadosGaleria }) {
  if (!dados.imagens.length) return null;
  return (
    <section className={`${estilos.secao} ${estilos.leitura}`}>
      <div className={estilos.interno}>
        {dados.titulo ? <h2 className={estilos.tituloSecao}>{dados.titulo}</h2> : null}
        <ul className={estilos.galeria}>
          {dados.imagens.map((imagem) => (
            <li key={imagem.url}>
              <Imagem imagem={imagem} sizes="(min-width: 900px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Só aparece com clientes reais cadastrados no Gestão. */
export function LogosClientes({ dados }: { dados: DadosLogos }) {
  const itens = dados.itens.filter((item) => item.imagem);
  if (!itens.length) return null;
  return (
    <section className={`${estilos.secao} ${estilos.leitura}`}>
      <div className={estilos.interno}>
        {dados.titulo ? <h2 className={estilos.tituloSecao}>{dados.titulo}</h2> : null}
        <ul className={estilos.logos}>
          {itens.map((item) => (
            <li key={item.nome}>{item.imagem ? <Imagem imagem={{ ...item.imagem, alt: item.nome }} sizes="160px" /> : null}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
