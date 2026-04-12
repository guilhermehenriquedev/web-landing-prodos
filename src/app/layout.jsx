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

export const metadata = {
  title: "PRÓDOS DIGITAL | Sistemas, Agentes de IA e Automação Empresarial",
  description:
    "Desenvolvemos sistemas sob demanda, agentes de IA personalizados para o seu negócio e automação de processos empresariais. Tecnologia sob medida para resultados reais.",
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
        <CustomCursor />
        <LayoutClientSide>{children}</LayoutClientSide>
      </body>
    </html>
  );
}
