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
          <h3>Pronto para ter um agente de IA trabalhando pelo seu negócio?</h3>
          <p>
            Desenvolvemos sistemas sob demanda, agentes de IA dedicados ao seu
            contexto e automação de processos empresariais. Cada solução é
            desenhada do zero para o seu negócio — sem atalhos genéricos.
          </p>
          <p>
            Fale com a gente e descubra como podemos transformar a sua operação!
          </p>

          <div style={{ marginTop: "30px" }} />
          <ButtonAnchor
            label="Entre em contato"
            contrastButton
            icon={<FiExternalLink />}
            pathUrl="https://wa.me/5586994665680"
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
