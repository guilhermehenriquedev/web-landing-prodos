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
          <h3>Transforme processos em resultados reais!</h3>
          <p>
            Desenvolvemos sistemas sob medida, automações e soluções com
            Inteligência Artificial para o seu negócio. Seja para otimizar
            operações, integrar sistemas ou automatizar decisões, estamos
            prontos para ajudar.
          </p>
          <p>
            Entre em contato e descubra como podemos impulsionar a eficiência
            da sua empresa!
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
