import Link from "next/link";

import { trilha } from "@/lib/jsonld";

import { JsonLd } from "./JsonLd";
import estilos from "./ui.module.scss";

type Item = { nome: string; url: string };

export function Trilha({ itens, tema = "claro" }: { itens: Item[]; tema?: "claro" | "escuro" }) {
  const todos = [{ nome: "Início", url: "/" }, ...itens];
  return (
    <>
      <nav aria-label="Você está em" className={`${estilos.trilha} ${tema === "escuro" ? estilos.trilhaEscura : ""}`}>
        <ol>
          {todos.map((item, indice) => {
            const ultimo = indice === todos.length - 1;
            return (
              <li key={item.url}>
                {ultimo ? <span aria-current="page">{item.nome}</span> : <Link href={item.url}>{item.nome}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd dados={trilha(todos)} />
    </>
  );
}
