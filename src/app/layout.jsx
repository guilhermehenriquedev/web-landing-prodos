import localFont from "next/font/local";
import "../styles/globals.scss";

//Layout
import LayoutClientSide from "../shared/components/LayoutClientSide";
import CustomCursor from "../shared/components/CustomCursor";

//Arquivos de fontes
const manualExpanded = localFont({
  src: "./fonts/manual-expanded-bold.otf",
  variable: "--font-manual-expanded",
});

const latoBold = localFont({
  src: "./fonts/Lato-Bold.ttf",
  variable: "--font-lato-bold",
});

const latoLight = localFont({
  src: "./fonts/Lato-Light.ttf",
  variable: "--font-lato-light",
});

const latoRegular = localFont({
  src: "./fonts/Lato-Regular.ttf",
  variable: "--font-lato-regular",
});

const titulo = "PRÓDOS DIGITAL | Sistemas, Agentes de IA e Automação Empresarial";
const descricao =
  "Desenvolvemos sistemas sob demanda, agentes de IA personalizados para o seu negócio e automação de processos empresariais. Tecnologia sob medida para resultados reais.";

export const metadata = {
  metadataBase: new URL("https://prodosdigital.com.br"),
  title: titulo,
  description: descricao,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Pródos Digital",
    title: titulo,
    description: descricao,
    images: [{ url: "/img/og-prodos-digital.jpg", width: 1200, height: 630, alt: "Logo da Pródos Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/img/og-prodos-digital.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060a13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${manualExpanded.variable} ${latoBold.variable} ${latoLight.variable} ${latoRegular.variable}`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <LayoutClientSide>{children}</LayoutClientSide>
      </body>
    </html>
  );
}
