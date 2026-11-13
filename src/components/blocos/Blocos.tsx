import type { Bloco } from "@/lib/tipos";

import { Cards } from "./Cards";
import { Cta } from "./Cta";
import { Faq } from "./Faq";
import { FormularioContato } from "./FormularioContato";
import { Galeria, LogosClientes } from "./Galeria";
import { Hero } from "./Hero";
import { ImagemTexto } from "./ImagemTexto";
import { ListaPosts } from "./ListaPosts";
import { ListaProdutos } from "./ListaProdutos";
import { TextoRico } from "./TextoRico";
import type * as T from "./tipos";
import { Video } from "./Video";

type Props = { blocos: Bloco[]; trilha?: React.ReactNode };

/** O primeiro hero da página leva o H1; tipo de bloco desconhecido é ignorado sem quebrar a página. */
export function Blocos({ blocos, trilha }: Props) {
  const primeiroHero = blocos.findIndex((b) => b.tipo === "hero");
  return (
    <>
      {blocos.map((bloco, indice) => {
        const d = bloco.dados as never;
        switch (bloco.tipo) {
          case "hero":
            return <Hero key={bloco.id} dados={d as T.DadosHero} principal={indice === primeiroHero} trilha={indice === primeiroHero ? trilha : undefined} />;
          case "texto_rico":
            return <TextoRico key={bloco.id} dados={d as T.DadosTexto} />;
          case "imagem_texto":
            return <ImagemTexto key={bloco.id} dados={d as T.DadosImagemTexto} />;
          case "cards":
            return <Cards key={bloco.id} dados={d as T.DadosCards} />;
          case "faq":
            return <Faq key={bloco.id} dados={d as T.DadosFaq} />;
          case "cta":
            return <Cta key={bloco.id} dados={d as T.DadosCta} />;
          case "lista_posts":
            return <ListaPosts key={bloco.id} dados={d as T.DadosListaPosts} />;
          case "lista_produtos":
            return <ListaProdutos key={bloco.id} dados={d as T.DadosListaProdutos} />;
          case "formulario_contato":
            return <FormularioContato key={bloco.id} dados={d as T.DadosFormulario} />;
          case "galeria":
            return <Galeria key={bloco.id} dados={d as T.DadosGaleria} />;
          case "video":
            return <Video key={bloco.id} dados={d as T.DadosVideo} />;
          case "logos_clientes":
            return <LogosClientes key={bloco.id} dados={d as T.DadosLogos} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export function temHero(blocos: Bloco[]): boolean {
  return blocos.some((b) => b.tipo === "hero");
}
