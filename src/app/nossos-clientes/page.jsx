"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

import styles from "./nossosClientes.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Constants
import { LOGO_PARTNERS } from "@/shared/constants";

export default function OurClients() {
  return (
    <>
      <section id="clients-page" className={styles.section}>
        <TitleSection
          title="NOSSOS CLIENTES"
          subtitle="Conheça nossos parceiros que confiam no nosso trabalho"
        />
      </section>
      <MotionController className={styles.containerCarouselClients}>
        <Marquee
          autoFill
          gradien={false}
          loop={0}
          speed={60}
          // gradientColor={"#0f0f0f"}
        >
          {LOGO_PARTNERS?.map((logo, index) => (
            <div className={styles.card} key={index}>
              <Image
                src={`/img/partners/${logo}`}
                alt={`Parceiro: ${logo}`}
                fill
                quality={100}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </Marquee>
      </MotionController>
    </>
  );
}
