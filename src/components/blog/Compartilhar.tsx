"use client";

import { useState } from "react";

import { Icone } from "@/components/ui/Icone";

import estilos from "./blog.module.scss";

export function Compartilhar({ url, titulo }: { url: string; titulo: string }) {
  const [copiado, setCopiado] = useState(false);
  const alvo = encodeURIComponent(url);
  const texto = encodeURIComponent(titulo);
  const redes = [
    { nome: "WhatsApp", href: `https://wa.me/?text=${texto}%20${alvo}` },
    { nome: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${alvo}` },
    { nome: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${alvo}` },
    { nome: "X", href: `https://x.com/intent/post?url=${alvo}&text=${texto}` },
  ];

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copie o link:", url);
    }
  }

  return (
    <div className={estilos.compartilhar}>
      <p>Compartilhe</p>
      <ul>
        {redes.map((rede) => (
          <li key={rede.nome}>
            <a href={rede.href} target="_blank" rel="noopener noreferrer">
              {rede.nome}
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={() => void copiar()} aria-live="polite">
            <Icone nome={copiado ? "check" : "link"} tamanho={16} />
            {copiado ? "Link copiado" : "Copiar link"}
          </button>
        </li>
      </ul>
    </div>
  );
}
