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
        title="QUEM SOMOS"
        subtitle="Especialistas em sistemas sob demanda e automações com IA"
      />

      <div className={styles.content}>
        <MotionController className={styles.containerHistory}>
          <p>
            A PRÓDOS DIGITAL é especializada em desenvolver sistemas sob medida e
            automações com Inteligência Artificial. Atuamos na transformação
            digital de órgãos públicos e na automação de processos em empresas
            privadas, criando soluções que conectam pessoas, dados e eficiência.
          </p>
          <p>
            Com equipe técnica especializada, entregamos sistemas escaláveis e
            seguros — de plataformas web e integrações até fluxos automatizados
            e soluções com IA. Cada projeto é feito sob demanda, com foco em
            resultado e impacto real na operação do cliente.
          </p>
          <p>
            Se o seu desafio envolve tecnologia, automação ou inteligência
            artificial, conte com a PRÓDOS DIGITAL para ir além.
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
            INOVADORAS
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
