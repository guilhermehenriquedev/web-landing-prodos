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
  title: "PRÓDOS DIGITAL",
  description:
    "A PRÓDOS DIGITAL transforma negócios com soluções completas de software e estratégias inovadoras de marketing digital, conectando sua empresa ao sucesso.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manualExpanded.variable} ${latoBold.variable} ${latoLight.variable} ${latoRegular.variable}`}
      >
        <LayoutClientSide>{children}</LayoutClientSide>
      </body>
    </html>
  );
}
