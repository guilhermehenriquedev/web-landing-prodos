"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Icone } from "@/components/ui/Icone";
import type { ItemMenu } from "@/lib/tipos";

import estilos from "./layout.module.scss";

export function MenuMovel({ menu }: { menu: ItemMenu[] }) {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();
  const id = useId();

  useEffect(() => setAberto(false), [caminho]);

  useEffect(() => {
    if (!aberto) return;
    const fecharComEsc = (evento: KeyboardEvent) => evento.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", fecharComEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fecharComEsc);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <>
      <button
        type="button"
        className={estilos.botaoMenu}
        aria-expanded={aberto}
        aria-controls={id}
        aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        onClick={() => setAberto(!aberto)}
      >
        <Icone nome={aberto ? "fechar" : "menu"} />
      </button>
      <nav id={id} aria-label="Menu" className={estilos.painelMovel} data-aberto={aberto} hidden={!aberto}>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              {item.url ? (
                <Link href={item.url} className={item.destaque ? estilos.botaoTopo : estilos.linkMovel}>
                  {item.rotulo}
                </Link>
              ) : (
                <span className={estilos.grupoMovel}>{item.rotulo}</span>
              )}
              {item.filhos.length ? (
                <ul>
                  {item.filhos.map((filho) =>
                    filho.url ? (
                      <li key={filho.id}>
                        <Link href={filho.url} className={estilos.linkMovelFilho}>
                          {filho.rotulo}
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
