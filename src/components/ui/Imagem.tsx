import Image from "next/image";

import type { Imagem as TipoImagem } from "@/lib/tipos";

type Props = { imagem: TipoImagem; sizes: string; prioridade?: boolean; className?: string; preencher?: boolean };

export function Imagem({ imagem, sizes, prioridade = false, className, preencher = false }: Props) {
  if (preencher) {
    return <Image src={imagem.url} alt={imagem.alt} fill sizes={sizes} priority={prioridade} className={className} />;
  }
  return (
    <Image
      src={imagem.url}
      alt={imagem.alt}
      width={imagem.largura}
      height={imagem.altura}
      sizes={sizes}
      priority={prioridade}
      className={className}
    />
  );
}
