"use client";

//Pages
import Home from "./home/page";
import Services from "./servicos/page";
import AutomationFlow from "./automacao/page";
import CallToAction from "./call-to-action/page";
import FaqQuestions from "./faq/page";
import Contacs from "./contatos/page";
import AboutUs from "./sobre-nos/page";

//Components
import Footer from "../shared/components/Footer";

export default function Index() {
  return (
    <>
      <Home />
      <Services />
      <AutomationFlow />
      <AboutUs />
      <CallToAction />
      <Contacs />
      <FaqQuestions />
      <Footer />
    </>
  );
}
