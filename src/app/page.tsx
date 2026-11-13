import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PaginaConteudo } from "@/components/paginas/PaginaConteudo";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

export const revalidate = 3600;

// Âncoras do site antigo (uma página só). O navegador não envia o # ao servidor, então o 301 não as vê.
const ANCORAS_ANTIGAS = `(function(){var m={"#services-page":"/servicos/sistemas-sob-medida","#about-page":"/sobre","#contacts-page":"/contato","#faq-page":"/contato","#testimonials-page":"/sobre","#portfolio-page":"/sobre"};var d=m[location.hash];if(d)location.replace(d);})();`;

export async function generateMetadata(): Promise<Metadata> {
  const [config, pagina] = await Promise.all([siteApi.config(), siteApi.pagina("inicio")]);
  return metadados(config, { caminho: "/", seo: pagina?.seo });
}

export default async function Inicio() {
  const pagina = await siteApi.pagina("inicio");
  if (!pagina) notFound();
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ANCORAS_ANTIGAS }} />
      <PaginaConteudo titulo={pagina.titulo} blocos={pagina.blocos} />
    </>
  );
}
