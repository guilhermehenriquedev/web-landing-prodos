import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { BotaoWhatsapp } from "@/components/layout/BotaoWhatsapp";
import { Rodape } from "@/components/layout/Rodape";
import { Topo } from "@/components/layout/Topo";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizacao } from "@/lib/jsonld";
import { urlDoSite } from "@/lib/seo";
import { siteApi } from "@/lib/site-api";

import "@/styles/globals.scss";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--fonte-jakarta",
});

export const viewport: Viewport = { themeColor: "#060a13", width: "device-width", initialScale: 1 };

export async function generateMetadata(): Promise<Metadata> {
  const config = await siteApi.config();
  return {
    metadataBase: new URL(urlDoSite()),
    title: { default: config.seo_padrao.titulo, template: `%s | ${config.nome}` },
    description: config.seo_padrao.descricao,
    applicationName: config.nome,
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    verification: config.scripts.verificacao_search_console ? { google: config.scripts.verificacao_search_console } : undefined,
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [config, menu] = await Promise.all([siteApi.config(), siteApi.menu()]);
  const ga4 = config.scripts.ga4_id;
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body>
        <a href="#conteudo" className="pular-para-conteudo">
          Pular para o conteúdo
        </a>
        <Topo nome={config.nome} menu={menu} />
        <main id="conteudo">{children}</main>
        <Rodape config={config} />
        <BotaoWhatsapp numero={config.contato.whatsapp} />
        <JsonLd dados={organizacao(config)} />
        {ga4 ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="lazyOnload" />
            <Script id="ga4" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga4}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
