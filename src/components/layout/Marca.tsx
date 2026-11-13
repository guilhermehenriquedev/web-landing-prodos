import Link from "next/link";

import estilos from "./layout.module.scss";

/** Símbolo da Pródos (o mesmo de public/img/logo.svg) com o nome ao lado. */
export function Marca({ nome }: { nome: string }) {
  return (
    <Link href="/" className={estilos.marca} aria-label={`${nome}, página inicial`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG local de 2 KB, sem ganho com o otimizador */}
      <img src="/img/logo.svg" alt="" width={40} height={31} />
      <span>{nome}</span>
    </Link>
  );
}
