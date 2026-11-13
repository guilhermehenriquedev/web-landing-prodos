import type { Metadata } from "next";

import estilos from "@/components/paginas/paginas.module.scss";
import { Botao } from "@/components/ui/Botao";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NaoEncontrada() {
  return (
    <section className={estilos.erro404}>
      <h1>Esta página não existe (mais)</h1>
      <p>O endereço pode ter mudado. Comece por um destes caminhos:</p>
      <ul>
        <li>
          <Botao url="/">Página inicial</Botao>
        </li>
        <li>
          <Botao url="/blog" estilo="claro">
            Blog
          </Botao>
        </li>
        <li>
          <Botao url="/contato" estilo="claro">
            Contato
          </Botao>
        </li>
      </ul>
    </section>
  );
}
