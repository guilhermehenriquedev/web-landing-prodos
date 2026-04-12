"use client";
import Image from "next/image";

import styles from "./styles.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";


export default function AboutUs() {
  return (
    <section id="about-page" className={styles.section}>
      <TitleSection
        title="QUEM SOMOS"
        subtitle="Especialistas em sistemas sob demanda, agentes de IA e automação empresarial"
      />

      <div className={styles.content}>
        <MotionController className={styles.containerHistory}>
          <p>
            A PRÓDOS DIGITAL desenvolve sistemas sob demanda, agentes de IA
            dedicados e automação de processos empresariais. Não entregamos
            soluções genéricas — cada projeto é desenhado para a realidade do
            cliente, com foco em resultado e impacto direto na operação.
          </p>
          <p>
            Nossos agentes de IA são treinados e personalizados para o contexto
            do seu negócio: entendem seus processos, operam nos seus fluxos e
            entregam decisões e ações concretas — não respostas de chatbot
            padrão.
          </p>
          <p>
            Se o seu desafio envolve tecnologia, automação ou inteligência
            artificial de verdade, conte com a PRÓDOS DIGITAL.
          </p>
        </MotionController>

        <MotionController className={styles.containerImage}>
          <Image
            src="/img/logo_full.png"
            alt="Logo da Pródos Digital"
            fill
            quality={100}
            style={{ objectFit: "contain" }}
          />
        </MotionController>
      </div>
    </section>
  );
}
