"use client";
import Image from "next/image";

import styles from "./styles.module.scss";

//Components
import ButtonAnchor from "@/shared/components/ButtonAnchor";
import MotionController from "@/shared/components/MotionController";

//Icons
import { FiExternalLink } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <MotionController delay={0.4} className={styles.content}>
        <div className={styles.cta}>
          <h3>Transforme ideias em resultados reais! 🚀</h3>
          <p>
            Desenvolvemos soluções personalizadas para o seu negócio, unindo
            estratégias de marketing digital e tecnologia de ponta. Seja para
            conquistar novos clientes, otimizar processos ou aumentar sua
            presença online, estamos prontos para ajudar.
          </p>
          <p>
            Entre em contato agora e descubra como podemos impulsionar seu
            sucesso!
          </p>

          <div style={{ marginTop: "30px" }} />
          <ButtonAnchor
            label="Entre em contato"
            contrastButton
            icon={<FiExternalLink />}
          />
        </div>

        <Image
          src="/img/hand-chating.png"
          alt="Mão interagindo com smartphone"
          width={400}
          height={400}
          quality={100}
          className={styles.image}
        />
      </MotionController>
    </section>
  );
}
