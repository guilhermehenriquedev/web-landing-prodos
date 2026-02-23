import localFont from "next/font/local";
import "../styles/globals.scss";

//Layout
import LayoutClientSide from "../shared/components/LayoutClientSide";

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

export const metadata = {
  title: "PRÓDOS DIGITAL | Sistemas sob demanda e automações com IA",
  description:
    "Sistemas sob medida, automação de processos e soluções com Inteligência Artificial. Desenvolvimento de software, integrações e consultoria para sua empresa.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${manualExpanded.variable} ${latoBold.variable} ${latoLight.variable} ${latoRegular.variable}`}
        suppressHydrationWarning
      >
        <LayoutClientSide>{children}</LayoutClientSide>
      </body>
    </html>
  );
}
