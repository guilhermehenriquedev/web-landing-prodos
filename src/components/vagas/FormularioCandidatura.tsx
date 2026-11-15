"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";

import estilosFormulario from "@/components/blocos/formulario.module.scss";
import type { Vaga } from "@/lib/tipos";

import estilos from "./vagas.module.scss";

type Estado = { tipo: "parado" | "enviando" | "enviado" } | { tipo: "erro"; mensagem: string };

const TAMANHO_MAXIMO = 5 * 1024 * 1024;
const FORMATOS = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const MENSAGEM_ERRO: Record<number, string> = {
  413: "O currículo passa de 5 MB. Envie um arquivo menor.",
  429: "Recebemos muitos envios deste endereço agora. Tente de novo mais tarde.",
};

// O Gestão responde 400 com { campo: ["mensagem"] }; as mensagens já são escritas para quem preenche.
async function primeiraMensagem(resposta: Response): Promise<string | null> {
  const corpo: unknown = await resposta.json().catch(() => null);
  if (!corpo || typeof corpo !== "object") return null;
  const primeira = Object.values(corpo).flat()[0];
  return typeof primeira === "string" ? primeira : null;
}

type Props = { vagas: Vaga[]; vagaInicial?: string };

export function FormularioCandidatura({ vagas, vagaInicial = "" }: Props) {
  const [estado, setEstado] = useState<Estado>({ tipo: "parado" });
  const id = useId();

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado.tipo === "enviando") return;
    const formulario = evento.currentTarget;
    const campos = new FormData(formulario);
    const curriculo = campos.get("curriculo");
    if (curriculo instanceof File && curriculo.size > TAMANHO_MAXIMO) {
      setEstado({ tipo: "erro", mensagem: MENSAGEM_ERRO[413] });
      return;
    }
    campos.set("consentimento_lgpd", campos.get("consentimento") === "on" ? "true" : "false");
    campos.delete("consentimento");
    setEstado({ tipo: "enviando" });
    try {
      const resposta = await fetch("/api/candidatura", { method: "POST", body: campos });
      if (!resposta.ok) {
        const mensagem = resposta.status === 400 ? await primeiraMensagem(resposta) : null;
        setEstado({ tipo: "erro", mensagem: mensagem ?? MENSAGEM_ERRO[resposta.status] ?? "Não conseguimos enviar agora. Tente de novo em alguns minutos." });
        return;
      }
      formulario.reset();
      setEstado({ tipo: "enviado" });
    } catch {
      setEstado({ tipo: "erro", mensagem: "Sem conexão. Confira a internet e tente de novo." });
    }
  }

  if (estado.tipo === "enviado") {
    return (
      <div className={estilosFormulario.sucesso} role="status">
        <h3>Currículo recebido</h3>
        <p>Obrigado pelo interesse. Se o seu perfil combinar com uma vaga, entramos em contato pelo e-mail ou WhatsApp que você informou.</p>
        <button type="button" onClick={() => setEstado({ tipo: "parado" })}>
          Enviar outra candidatura
        </button>
      </div>
    );
  }

  return (
    <form className={estilosFormulario.formulario} onSubmit={enviar} aria-describedby={estado.tipo === "erro" ? `${id}-erro` : undefined}>
      <label>
        <span>Vaga</span>
        <select name="vaga" defaultValue={vagas.some((vaga) => vaga.slug === vagaInicial) ? vagaInicial : ""} className={estilos.selecao}>
          <option value="">Banco de talentos (nenhuma vaga específica)</option>
          {vagas.map((vaga) => (
            <option key={vaga.slug} value={vaga.slug}>
              {vaga.titulo}
            </option>
          ))}
        </select>
      </label>
      <div className={estilosFormulario.duasColunas}>
        <label>
          <span>Nome completo *</span>
          <input name="nome" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>E-mail *</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" />
        </label>
        <label>
          <span>WhatsApp ou telefone *</span>
          <input name="telefone" type="tel" required maxLength={20} pattern="[0-9()+\-\s]{8,20}" autoComplete="tel" inputMode="tel" />
        </label>
        <label>
          <span>Cidade</span>
          <input name="cidade" maxLength={80} autoComplete="address-level2" />
        </label>
      </div>
      <label>
        <span>LinkedIn ou portfólio</span>
        <input name="linkedin" type="url" maxLength={300} placeholder="https://" />
      </label>
      <label>
        <span>Currículo * (PDF, DOC ou DOCX, até 5 MB)</span>
        <input name="curriculo" type="file" required accept={FORMATOS} className={estilos.arquivo} />
      </label>
      <label>
        <span>Quer contar algo mais?</span>
        <textarea name="mensagem" maxLength={3000} rows={4} placeholder="Experiências, disponibilidade, pretensão..." />
      </label>
      {/* Campo isca: pessoas não veem; robôs preenchem e o envio é descartado. */}
      <label className={estilosFormulario.isca} aria-hidden="true">
        <span>Site</span>
        <input name="hp" tabIndex={-1} autoComplete="off" />
      </label>
      <label className={estilosFormulario.consentimento}>
        <input name="consentimento" type="checkbox" required />
        <span>
          Concordo que a Pródos guarde estes dados e o meu currículo para processos seletivos, conforme a{" "}
          <Link href="/politicas">política de privacidade</Link>.
        </span>
      </label>
      {estado.tipo === "erro" ? (
        <p id={`${id}-erro`} className={estilosFormulario.erro} role="alert">
          {estado.mensagem}
        </p>
      ) : null}
      <button type="submit" className={estilosFormulario.enviar} disabled={estado.tipo === "enviando"}>
        {estado.tipo === "enviando" ? "Enviando..." : "Enviar candidatura"}
      </button>
    </form>
  );
}

/** Lê ?vaga= da URL (links "Quero me candidatar"). Fica num Suspense para a página continuar estática. */
export function FormularioComVagaDaUrl({ vagas }: { vagas: Vaga[] }) {
  const vaga = useSearchParams().get("vaga") ?? "";
  return <FormularioCandidatura key={vaga} vagas={vagas} vagaInicial={vaga} />;
}
