import { IconeConversa } from "@/components/ui/Icone";
import { linkWhatsApp } from "@/lib/seo";

import estilos from "./layout.module.scss";

export function BotaoWhatsapp({ numero }: { numero: string | null }) {
  const url = linkWhatsApp(numero, "Olá! Vim pelo site da Pródos e quero conversar.");
  if (!url) return null;
  return (
    <a href={url} className={estilos.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar com a Pródos no WhatsApp">
      <IconeConversa />
      <span className={estilos.whatsappTexto}>Fale conosco</span>
    </a>
  );
}
