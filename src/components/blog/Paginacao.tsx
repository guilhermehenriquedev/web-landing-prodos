import Link from "next/link";

import estilos from "./blog.module.scss";

export function Paginacao({ atual, total, base }: { atual: number; total: number; base: string }) {
  if (total <= 1) return null;
  const endereco = (pagina: number) => (pagina === 1 ? base : `${base}/pagina/${pagina}`);
  return (
    <nav aria-label="Páginas do blog" className={estilos.paginacao}>
      {atual > 1 ? <Link href={endereco(atual - 1)} rel="prev">Anteriores</Link> : <span />}
      <span>
        Página {atual} de {total}
      </span>
      {atual < total ? <Link href={endereco(atual + 1)} rel="next">Próximos</Link> : <span />}
    </nav>
  );
}
