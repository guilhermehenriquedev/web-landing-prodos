"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import type { DadosFormulario } from "./tipos";
import estilos from "./formulario.module.scss";

type Estado = { tipo: "parado" | "enviando" | "enviado" } | { tipo: "erro"; mensagem: string };

const MENSAGEM_ERRO: Record<number, string> = {
  400: "Confira os campos destacados e tente de novo.",
  429: "Recebemos muitas mensagens deste endereço agora. Tente de novo em alguns minutos ou chame no WhatsApp.",
};

export function FormularioContato({ dados }: { dados: DadosFormulario }) {
  const [estado, setEstado] = useState<Estado>({ tipo: "parado" });
  const caminho = usePathname();
  const id = useId();

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (estado.tipo === "enviando") return;
    const formulario = evento.currentTarget;
    const campos = new FormData(formulario);
    setEstado({ tipo: "enviando" });
    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: campos.get("nome"),
          email: campos.get("email"),
          telefone: campos.get("telefone") || "",
          empresa: campos.get("empresa") || "",
          mensagem: campos.get("mensagem"),
          consentimento_lgpd: campos.get("consentimento") === "on",
          hp: campos.get("site") || "",
          origem: caminho,
        }),
      });
      if (!resposta.ok) {
        setEstado({ tipo: "erro", mensagem: MENSAGEM_ERRO[resposta.status] ?? "Não conseguimos enviar agora. Tente de novo ou chame no WhatsApp." });
        return;
      }
      formulario.reset();
      setEstado({ tipo: "enviado" });
    } catch {
      setEstado({ tipo: "erro", mensagem: "Sem conexão. Confira a internet e tente de novo." });
    }
  }

  return (
    <section className={estilos.secao} id="contato">
      <div className={estilos.interno}>
        <div className={estilos.texto}>
          <h2>{dados.titulo}</h2>
          {dados.texto ? <p>{dados.texto}</p> : null}
        </div>
        {estado.tipo === "enviado" ? (
          <div className={estilos.sucesso} role="status">
            <h3>Mensagem enviada</h3>
            <p>Obrigado pelo contato. Respondemos em horário comercial, pelo canal que você informou.</p>
            <button type="button" onClick={() => setEstado({ tipo: "parado" })}>
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form className={estilos.formulario} onSubmit={enviar} noValidate={false} aria-describedby={estado.tipo === "erro" ? `${id}-erro` : undefined}>
            <div className={estilos.duasColunas}>
              <label>
                <span>Nome *</span>
                <input name="nome" required maxLength={120} autoComplete="name" />
              </label>
              <label>
                <span>E-mail *</span>
                <input name="email" type="email" required maxLength={254} autoComplete="email" />
              </label>
              <label>
                <span>WhatsApp ou telefone</span>
                <input name="telefone" type="tel" maxLength={20} pattern="[0-9()+\-\s]{8,20}" autoComplete="tel" inputMode="tel" />
              </label>
              <label>
                <span>Empresa</span>
                <input name="empresa" maxLength={120} autoComplete="organization" />
              </label>
            </div>
            <label>
              <span>Mensagem *</span>
              <textarea name="mensagem" required maxLength={3000} rows={5} placeholder="Conte o que você quer resolver." />
            </label>
            {/* Campo isca: pessoas não veem; robôs preenchem e a mensagem é descartada. */}
            <label className={estilos.isca} aria-hidden="true">
              <span>Site</span>
              <input name="site" tabIndex={-1} autoComplete="off" />
            </label>
            <label className={estilos.consentimento}>
              <input name="consentimento" type="checkbox" required />
              <span>
                Concordo que a Pródos use estes dados para responder ao meu contato, conforme a <Link href="/politicas">política de privacidade</Link>.
              </span>
            </label>
            {estado.tipo === "erro" ? (
              <p id={`${id}-erro`} className={estilos.erro} role="alert">
                {estado.mensagem}
              </p>
            ) : null}
            <button type="submit" className={estilos.enviar} disabled={estado.tipo === "enviando"}>
              {estado.tipo === "enviando" ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
