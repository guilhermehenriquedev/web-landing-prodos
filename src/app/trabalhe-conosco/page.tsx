import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import estilosPagina from "@/components/paginas/paginas.module.scss";
import { JsonLd } from "@/components/ui/JsonLd";
import { Trilha } from "@/components/ui/Trilha";
import { FormularioCandidatura, FormularioComVagaDaUrl } from "@/components/vagas/FormularioCandidatura";
import estilos from "@/components/vagas/vagas.module.scss";
import { vaga as jsonLdVaga } from "@/lib/jsonld";
import { metadados } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";
import type { Vaga } from "@/lib/tipos";

export const revalidate = 3600;

const DESCRICAO = "Vagas abertas na Pródos Digital e banco de talentos. Envie o seu currículo para trabalhar com sistemas sob medida, automação e IA.";

export async function generateMetadata(): Promise<Metadata> {
  const config = await siteApi.config();
  return metadados(config, { caminho: "/trabalhe-conosco", titulo: `Trabalhe conosco | ${config.nome}`, descricao: DESCRICAO });
}

function detalhes(vaga: Vaga) {
  return [vaga.area, vaga.modalidade_rotulo, vaga.local, vaga.contratacao].filter(Boolean);
}

export default async function TrabalheConosco() {
  const [config, vagas] = await Promise.all([siteApi.config(), siteApi.vagas()]);
  return (
    <>
      <header className={estilosPagina.cabecalho}>
        <div className={estilosPagina.interno}>
          <Trilha itens={[{ nome: "Trabalhe conosco", url: "/trabalhe-conosco" }]} tema="escuro" />
          <h1>Trabalhe conosco</h1>
          <p>Construímos sistemas que tiram trabalho manual das empresas. Se você gosta de resolver problemas reais, queremos te conhecer.</p>
        </div>
      </header>

      <section className={estilos.secao} aria-labelledby="vagas-abertas">
        <div className={estilos.interno}>
          <h2 id="vagas-abertas">{vagas.length ? "Vagas abertas" : "Nenhuma vaga aberta agora"}</h2>
          {vagas.length ? (
            <ul className={estilos.lista}>
              {vagas.map((vaga) => (
                <li key={vaga.slug} id={`vaga-${vaga.slug}`} className={estilos.vaga}>
                  <h3>{vaga.titulo}</h3>
                  <ul className={estilos.etiquetas} aria-label="Detalhes da vaga">
                    {detalhes(vaga).map((detalhe) => (
                      <li key={detalhe}>{detalhe}</li>
                    ))}
                  </ul>
                  <p className={estilos.resumo}>{vaga.resumo}</p>
                  <details className={estilos.mais}>
                    <summary>Ver descrição completa</summary>
                    <h4>Sobre a vaga</h4>
                    <p>{vaga.descricao}</p>
                    {vaga.requisitos ? (
                      <>
                        <h4>O que buscamos</h4>
                        <p>{vaga.requisitos}</p>
                      </>
                    ) : null}
                  </details>
                  <Link href={`/trabalhe-conosco?vaga=${vaga.slug}#candidatura`} className={estilos.candidatar}>
                    Quero me candidatar
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={estilos.semVagas}>Mesmo assim, deixe o seu currículo no banco de talentos. Quando abrir uma vaga com o seu perfil, falamos com você.</p>
          )}
        </div>
      </section>

      <section className={estilos.secaoFormulario} id="candidatura" aria-labelledby="titulo-candidatura">
        <div className={estilos.internoFormulario}>
          <div>
            <h2 id="titulo-candidatura">Envie o seu currículo</h2>
            <p>Escolha uma vaga ou deixe no banco de talentos. Lemos todos os currículos e respondemos quem seguir no processo.</p>
          </div>
          <Suspense fallback={<FormularioCandidatura vagas={vagas} />}>
            <FormularioComVagaDaUrl vagas={vagas} />
          </Suspense>
        </div>
      </section>

      <JsonLd dados={vagas.map((vaga) => jsonLdVaga(vaga, config))} />
    </>
  );
}
