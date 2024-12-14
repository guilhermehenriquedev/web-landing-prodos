"use client";
import styles from "./services.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { MdDeveloperMode } from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { RiRobot2Fill } from "react-icons/ri";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdDesignServices } from "react-icons/md";
import { PiFilmSlate } from "react-icons/pi";
import { FaMicrophoneLines } from "react-icons/fa6";

const cards = [
  {
    id: 1,
    icon: <MdDeveloperMode />,
    title: "Desenvolvimento de sistemas",
    description:
      "Construímos sistemas personalizados para atender às necessidades exclusivas do seu negócio, utilizando tecnologia de ponta e as melhores práticas do mercado",
  },
  {
    id: 2,
    icon: <RiToolsFill />,
    title: "Manutenção de computadores",
    description:
      "Diagnóstico e reparo de computadores, garantindo que seus equipamentos funcionem com máxima eficiência",
  },
  {
    id: 3,
    icon: <GrAnalytics />,
    title: "Análise de dados",
    description:
      "Transformamos dados brutos em informações valiosas para impulsionar decisões estratégicas e o crescimento do seu negócio",
  },
  {
    id: 4,
    icon: <RiRobot2Fill />,
    title: "Automação de processos",
    description:
      "Otimizamos tarefas repetitivas e manuais por meio de soluções automatizadas, reduzindo custos e aumentando a eficiência",
  },
  {
    id: 5,
    icon: <TfiAnnouncement />,
    title: "Tráfego pago",
    description:
      "Atraímos clientes qualificados para o seu negócio por meio de campanhas estratégicas em anúncios online",
  },
  {
    id: 6,
    icon: <MdOutlinePhoneIphone />,
    title: "Gestão de redes sociais",
    description:
      "Cuidamos da sua presença digital com conteúdos atrativos e estratégias que conectam sua marca ao público certo",
  },
  {
    id: 7,
    icon: <MdDesignServices />,
    title: "Edição de Vídeos/Fotos",
    description:
      "Transformamos sua visão criativa em realidade com edições profissionais que destacam a essência do seu conteúdo",
  },
  {
    id: 8,
    icon: <PiFilmSlate />,
    title: "Criação de conteúdo",
    description:
      "Desenvolvemos conteúdos criativos e relevantes que engajam o público e fortalecem a identidade da sua marca em diferentes canais digitais",
  },
  {
    id: 9,
    icon: <FaMicrophoneLines />,
    title: "Assessoria de imprensa",
    description:
      "Gerenciamos a comunicação da sua empresa com a mídia, garantindo visibilidade positiva e alinhada aos seus objetivos estratégicos",
  },
];

export default function Services() {
  return (
    <section id="services-page" className={styles.section}>
      <TitleSection
        title="NOSSOS SERVIÇOS"
        subtitle="Nossas soluções são personalizadas para atender às suas necessidades"
      />

      <div className={styles.grid}>
        {cards.map((card, index) => (
          <MotionController key={card.id} className={styles.card}>
            <div className={styles.boxIcon}>{card.icon}</div>
            <h4 className={styles.cardTitle}>{card.title.toUpperCase()}</h4>
            <p className={styles.cardContent}>{card.description}</p>
          </MotionController>
        ))}
      </div>
    </section>
  );
}
