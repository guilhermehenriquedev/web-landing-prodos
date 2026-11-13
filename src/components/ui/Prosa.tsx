import estilos from "./ui.module.scss";

type Props = { html: string; className?: string };

/** Texto rico já sanitizado no Gestão (lista fechada de tags). */
export function Prosa({ html, className }: Props) {
  return <div className={`${estilos.prosa} ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
