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
          <p>
            Na Pródos Digital, acreditamos que a transformação começa com ideias
            ousadas e soluções inovadoras. Somos uma empresa comprometida em
            conectar pessoas, processos e tecnologia para criar experiências
            únicas e impactar positivamente os negócios de nossos clientes.
          </p>
          <p>
            Com uma equipe apaixonada e movida por desafios, unimos criatividade
            e expertise técnica para entregar resultados que fazem a diferença.
            Nossa essência está em buscar excelência em cada detalhe,
            construindo relacionamentos de confiança e parcerias de longo prazo.
          </p>
          <p>
            Estamos sempre em evolução, acompanhando tendências e explorando
            novas possibilidades para antecipar as necessidades do mercado. Para
            nós, cada projeto é uma oportunidade de ir além, superando
            expectativas e impulsionando histórias de sucesso.
          </p>

          <p>
            Mais do que uma empresa, somos uma equipe que sonha grande e
            trabalha com propósito. Convidamos você a fazer parte dessa jornada
            conosco! 🚀
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
