import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import type { ItemMenu } from "@/lib/tipos";

import { Marca } from "./Marca";
import { MenuMovel } from "./MenuMovel";
import estilos from "./layout.module.scss";

function LinkMenu({ item, className }: { item: ItemMenu; className?: string }) {
  if (!item.url) return <span className={className}>{item.rotulo}</span>;
  if (item.tipo === "externo") {
    return (
      <a href={item.url} className={className} {...(item.nova_aba ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {item.rotulo}
      </a>
    );
  }
  return (
    <Link href={item.url} className={className}>
      {item.rotulo}
    </Link>
  );
}

export function Topo({ nome, menu }: { nome: string; menu: ItemMenu[] }) {
  const comuns = menu.filter((item) => !item.destaque);
  const destaques = menu.filter((item) => item.destaque && item.url);
  return (
    <header className={estilos.topo}>
      <div className={estilos.topoInterno}>
        <Marca nome={nome} />
        <nav aria-label="Principal" className={estilos.navDesktop}>
          <ul>
            {comuns.map((item) => (
              <li key={item.id} className={item.filhos.length ? estilos.temSubmenu : undefined}>
                <LinkMenu item={item} className={estilos.linkTopo} />
                {item.filhos.length ? (
                  <>
                    <Icone nome="descer" tamanho={16} className={estilos.seta} />
                    <ul className={estilos.submenu} aria-label={`Submenu de ${item.rotulo}`}>
                      {item.filhos.map((filho) => (
                        <li key={filho.id}>
                          <LinkMenu item={filho} className={estilos.linkSubmenu} />
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div className={estilos.acoesTopo}>
          {destaques.map((item) => (
            <LinkMenu key={item.id} item={item} className={estilos.botaoTopo} />
          ))}
          <MenuMovel menu={menu} />
        </div>
      </div>
    </header>
  );
}
