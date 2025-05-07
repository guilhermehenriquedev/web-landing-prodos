"use client";
import Image from "next/image";

import styles from "./styles.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { FaLaptopCode } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";

export default function AboutUs() {
  return (
    <section id="about-page" className={styles.section}>
      <TitleSection
        title="SOBRE NÓS"
        subtitle="Saiba um pouco mais sobre a nossa história"
      />

      <div className={styles.content}>
        <MotionController className={styles.containerHistory}>
        <p> Na Pródos Digital, unimos a robustez de uma fábrica de software à visão estratégica de uma agência digital para liderar a transformação digital em órgãos públicos e impulsionar a automação de processos em empresas privadas. Desenvolvemos soluções tecnológicas sob medida que conectam pessoas, dados e eficiência. </p> <p> Com uma equipe especializada e movida por propósito, criamos sistemas inteligentes, escaláveis e seguros — desde plataformas governamentais até fluxos automatizados que otimizam rotinas corporativas. Cada projeto é construído com foco em resultado, inovação e impacto real. </p> <p> Estamos atentos às necessidades do setor público e aos desafios do mercado privado, atuando com agilidade, transparência e visão de futuro. Se o seu desafio envolve tecnologia, transformação e eficiência, conte com a Pródos Digital para ir além. </p>
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
      <div className={styles.containerCards}>
        <MotionController className={styles.card}>
          <FaLaptopCode />
          <h3>
            TECNOLOGIA
            <br />
            DE PONTA
          </h3>
          {/* <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </span> */}
        </MotionController>

        <MotionController className={styles.card}>
          <HiOutlineLightBulb />
          <h3>
            SOLUÇÕES
            <br />
            CRIATIVAS
          </h3>
          {/* <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </span> */}
        </MotionController>

        <MotionController className={styles.card}>
          <MdRocketLaunch />
          <h3>
            RESULTADOS
            <br />
            COMPROVADOS
          </h3>
          {/* <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </span> */}
        </MotionController>

        <MotionController className={styles.card}>
          <IoIosPeople />
          <h3>
            EQUIPE
            <br />
            EXPERIENTE
          </h3>
          {/* <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </span> */}
        </MotionController>
      </div>
    </section>
  );
}
