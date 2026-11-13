"use client";

import { useState } from "react";

import { Icone } from "@/components/ui/Icone";

import type { DadosVideo } from "./tipos";
import estilos from "./blocos.module.scss";

function enderecoDeIncorporacao(url: string): string | null {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`;
  return null;
}

/** O player só carrega no clique: nada de JavaScript de terceiros pesando a página. */
export function Video({ dados }: { dados: DadosVideo }) {
  const [tocando, setTocando] = useState(false);
  const endereco = enderecoDeIncorporacao(dados.url);
  if (!endereco) return null;
  return (
    <section className={`${estilos.secao} ${estilos.leitura}`}>
      <div className={estilos.interno}>
        <h2 className={estilos.tituloSecao}>{dados.titulo}</h2>
        <div className={estilos.video}>
          {tocando ? (
            <iframe src={endereco} title={dados.titulo} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
          ) : (
            <button type="button" onClick={() => setTocando(true)} aria-label={`Assistir: ${dados.titulo}`}>
              <Icone nome="play" tamanho={32} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
