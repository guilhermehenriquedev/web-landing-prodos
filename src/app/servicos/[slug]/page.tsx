import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PaginaConteudo } from "@/components/paginas/PaginaConteudo";
import estilos from "@/components/paginas/paginas.module.scss";
import { Icone } from "@/components/ui/Icone";
import { metadados } from "@/lib/seo";
import { parametrosEstaticos, siteApi } from "@/lib/site-api";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

async function servico(slug: string) {
  const pagina = await siteApi.pagina(slug);
  return pagina?.tipo === "servico" ? pagina : null;
}

export function generateStaticParams() {
  return parametrosEstaticos(async () => {
    const paginas = await siteApi.paginas();
    return paginas.filter((p) => p.tipo === "servico").map((p) => ({ slug: p.slug }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [config, pagina] = await Promise.all([siteApi.config(), servico(slug)]);
  if (!pagina) return {};
  return metadados(config, { caminho: pagina.url, seo: pagina.seo });
}

export default async function Servico({ params }: Props) {
  const { slug } = await params;
  const [pagina, todas] = await Promise.all([servico(slug), siteApi.paginas()]);
  if (!pagina) notFound();
  const outros = todas.filter((p) => p.tipo === "servico" && p.slug !== pagina.slug);
  return (
    <PaginaConteudo
      titulo={pagina.titulo}
      blocos={pagina.blocos}
      trilha={[{ nome: "Serviços", url: "/servicos/sistemas-sob-medida" }, { nome: pagina.titulo, url: pagina.url }]}
      produtoRelacionado={pagina.produto_relacionado}
      depois={
        outros.length ? (
          <section className={estilos.secao} aria-labelledby="outros-servicos">
            <div className={estilos.interno}>
              <h2 id="outros-servicos">Outros serviços</h2>
              <ul className={estilos.listaLinks}>
                {outros.map((outro) => (
                  <li key={outro.slug}>
                    <Link href={outro.url}>
                      {outro.titulo}
                      <Icone nome="seta" tamanho={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null
      }
    />
  );
}
