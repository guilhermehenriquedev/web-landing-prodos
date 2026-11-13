import { CardProduto } from "@/components/blog/CardProduto";
import { siteApi } from "@/lib/site-api";

import type { DadosListaProdutos } from "./tipos";
import estilos from "./blocos.module.scss";

export async function ListaProdutos({ dados, nivel = 3 }: { dados: DadosListaProdutos; nivel?: 2 | 3 }) {
  const produtos = await siteApi.produtos();
  if (!produtos.length) return null;
  return (
    <section className={`${estilos.secao} ${estilos.suave}`}>
      <div className={estilos.interno}>
        {dados.titulo ? (
          <header className={estilos.cabecalhoSecao}>
            <h2 className={estilos.tituloSecao}>{dados.titulo}</h2>
            {dados.subtitulo ? <p>{dados.subtitulo}</p> : null}
          </header>
        ) : null}
        <div className={estilos.gradeProdutos}>
          {produtos.map((produto) => (
            <CardProduto key={produto.slug} produto={produto} nivel={dados.titulo ? nivel : 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
