import type { ItemSumario } from "@/lib/html";

import estilos from "./blog.module.scss";

function Lista({ itens }: { itens: ItemSumario[] }) {
  return (
    <ol>
      {itens.map((item) => (
        <li key={item.id} data-nivel={item.nivel}>
          <a href={`#${item.id}`}>{item.texto}</a>
        </li>
      ))}
    </ol>
  );
}

/** No celular: recolhido no topo do artigo. */
export function SumarioMovel({ itens }: { itens: ItemSumario[] }) {
  if (itens.length < 3) return null;
  return (
    <details className={estilos.sumarioMovel}>
      <summary>Neste artigo</summary>
      <nav aria-label="Sumário do artigo">
        <Lista itens={itens} />
      </nav>
    </details>
  );
}

/** No computador: fixo na lateral enquanto a pessoa lê. */
export function SumarioLateral({ itens }: { itens: ItemSumario[] }) {
  if (itens.length < 3) return null;
  return (
    <nav aria-label="Sumário" className={estilos.sumarioLateral}>
      <p>Neste artigo</p>
      <Lista itens={itens} />
    </nav>
  );
}
