import Link from "next/link";

import { Icone } from "./Icone";
import estilos from "./ui.module.scss";

type Props = {
  url: string;
  children: React.ReactNode;
  estilo?: "primario" | "secundario" | "link" | "claro" | "inverso";
  novaAba?: boolean;
  seta?: boolean;
  tamanho?: "normal" | "grande";
};

export function eExterno(url: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(url);
}

export function Botao({ url, children, estilo = "primario", novaAba = false, seta = false, tamanho = "normal" }: Props) {
  const classe = `${estilos.botao} ${estilos[estilo]} ${tamanho === "grande" ? estilos.grande : ""}`;
  const conteudo = (
    <>
      <span>{children}</span>
      {seta ? <Icone nome="seta" tamanho={18} /> : null}
    </>
  );
  if (eExterno(url)) {
    const abrirFora = novaAba || url.startsWith("http");
    return (
      <a href={url} className={classe} {...(abrirFora ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {conteudo}
      </a>
    );
  }
  return (
    <Link href={url} className={classe}>
      {conteudo}
    </Link>
  );
}
