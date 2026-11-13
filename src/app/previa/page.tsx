import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Artigo } from "@/components/blog/Artigo";
import { PaginaConteudo } from "@/components/paginas/PaginaConteudo";
import { siteApi } from "@/lib/site-api";

import estilos from "./previa.module.scss";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prévia", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ token?: string }> };

export default async function Previa({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token) notFound();
  const previa = await siteApi.previa(token);
  if (!previa) notFound();
  return (
    <>
      <p className={estilos.faixa} role="status">
        Prévia: assim ficará no site. Este endereço expira em 1 hora e não aparece no Google.
      </p>
      {previa.alvo === "post" ? <Artigo post={previa.post} /> : null}
      {previa.alvo === "pagina" ? <PaginaConteudo titulo={previa.pagina.titulo} blocos={previa.pagina.blocos} produtoRelacionado={previa.pagina.produto_relacionado} /> : null}
      {previa.alvo === "produto" ? <PaginaConteudo titulo={previa.produto.titulo} blocos={previa.produto.blocos} /> : null}
    </>
  );
}
