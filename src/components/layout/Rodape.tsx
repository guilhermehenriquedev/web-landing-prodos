import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import { linkWhatsApp } from "@/lib/seo";
import type { Config } from "@/lib/tipos";

import { Marca } from "./Marca";
import estilos from "./layout.module.scss";

const NOME_REDE: Record<string, string> = { instagram: "Instagram", linkedin: "LinkedIn", facebook: "Facebook", youtube: "YouTube", tiktok: "TikTok", x: "X" };

export function Rodape({ config }: { config: Config }) {
  const { contato } = config;
  const endereco = contato.endereco;
  const whatsapp = linkWhatsApp(contato.whatsapp);
  return (
    <footer className={estilos.rodape}>
      <div className={estilos.rodapeInterno}>
        <div className={estilos.rodapeMarca}>
          <Marca nome={config.nome} />
          {config.rodape.texto ? <p>{config.rodape.texto}</p> : null}
          <address className={estilos.contato}>
            {whatsapp && contato.telefone ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <Icone nome="telefone" tamanho={18} /> {contato.telefone}
              </a>
            ) : null}
            {contato.email ? (
              <a href={`mailto:${contato.email}`}>
                <Icone nome="email" tamanho={18} /> {contato.email}
              </a>
            ) : null}
            {endereco ? (
              <span>
                <Icone nome="local" tamanho={18} />
                {[endereco.logradouro, endereco.numero, endereco.bairro].filter(Boolean).join(", ")}
                {endereco.logradouro ? " · " : ""}
                {endereco.cidade} ({endereco.uf}){endereco.cep ? `, ${endereco.cep}` : ""}
              </span>
            ) : null}
          </address>
        </div>
        {config.rodape.colunas.map((coluna) => (
          <nav key={coluna.titulo} aria-label={coluna.titulo} className={estilos.colunaRodape}>
            <h2>{coluna.titulo}</h2>
            <ul>
              {coluna.links.map((link) => (
                <li key={link.url}>
                  <Link href={link.url}>{link.rotulo}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={estilos.rodapeBase}>
        <p>
          © {new Date().getFullYear()} {config.razao_social || config.nome}
          {config.cnpj ? ` · CNPJ ${config.cnpj}` : ""}
        </p>
        {config.redes.length ? (
          <ul className={estilos.redes}>
            {config.redes.map((rede) => (
              <li key={rede.url}>
                <a href={rede.url} target="_blank" rel="noopener noreferrer me">
                  {NOME_REDE[rede.rede] ?? rede.rede}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
