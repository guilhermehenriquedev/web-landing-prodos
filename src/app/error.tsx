"use client";

import estilos from "@/components/paginas/paginas.module.scss";

export default function Erro({ reset }: { reset: () => void }) {
  return (
    <section className={estilos.erro404}>
      <h1>Não conseguimos carregar esta página agora</h1>
      <p>Tente de novo em instantes. Se preferir, fale com a gente pelo WhatsApp.</p>
      <ul>
        <li>
          <button type="button" onClick={reset} style={{ minHeight: 48, padding: "0 20px", borderRadius: 999, border: 0, background: "#1d6ad8", color: "#fff", fontWeight: 700 }}>
            Tentar de novo
          </button>
        </li>
      </ul>
    </section>
  );
}
