type Props = { dados: object | object[] | null };

export function JsonLd({ dados }: Props) {
  if (!dados) return null;
  // "<" escapado: o conteúdo vem do Gestão e não pode fechar a tag script.
  const texto = JSON.stringify(dados).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: texto }} />;
}
