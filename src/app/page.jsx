"use client";

//Pages
import Home from "./home/page";
import Services from "./servicos/page";
import OurClients from "./nossos-clientes/page";
import CallToAction from "./call-to-action/page";
import FaqQuestions from "./faq/page";
import Contacs from "./contatos/page";
import AboutUs from "./sobre-nos/page";
import Portfolio from "./portfolio/page";
import Testimonials from "./testemunhos/page";

//Components
import Footer from "../shared/components/Footer";
// import DividerSection from "../shared/components/DividerSection";
import DividerSectionWithBackground from "../shared/components/DividerSectionWithBackground";

export default function Index() {
  return (
    <>
      <Home />
      <Services />
      {/* <DividerSection /> */}
      <AboutUs />
      <CallToAction />
      <OurClients />
      {/* <Portfolio /> */}
      <DividerSectionWithBackground />
      <Contacs />
      {/* <Testimonials /> */}
      <FaqQuestions />
      <Footer />
    </>
  );
}
