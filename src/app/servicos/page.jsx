"use client";
import styles from "./services.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { MdDeveloperMode } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { GrAnalytics } from "react-icons/gr";
import { IoSparkles } from "react-icons/io5";
import { TbApi } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi2";

const cards = [
  {
    id: 1,
    icon: <MdDeveloperMode />,
    title: "Sistemas sob demanda",
    description:
      "Desenvolvemos sistemas web e mobile sob medida: ERPs, CRMs, portais e dashboards que se adaptam às necessidades exclusivas do seu negócio.",
  },
  {
    id: 2,
    icon: <RiRobot2Fill />,
    title: "Automação de processos",
    description:
      "Automatizamos tarefas repetitivas, integrações entre sistemas e workflows, reduzindo custos e aumentando a eficiência operacional.",
  },
  {
    id: 3,
    icon: <IoSparkles />,
    title: "Soluções com Inteligência Artificial",
    description:
      "Chatbots, assistentes virtuais, análise e classificação de dados, extração de informações e decisões automatizadas com IA.",
  },
  {
    id: 4,
    icon: <TbApi />,
    title: "Integração entre sistemas",
    description:
      "Conectamos seus sistemas, APIs e ferramentas para que dados e processos fluam de forma segura e automatizada.",
  },
  {
    id: 5,
    icon: <GrAnalytics />,
    title: "Análise de dados",
    description:
      "Transformamos dados em insights para decisões estratégicas, relatórios e indicadores que impulsionam o crescimento.",
  },
  {
    id: 6,
    icon: <HiOutlineLightBulb />,
    title: "Consultoria e desenho de processos",
    description:
      "Ajudamos a mapear processos, definir arquitetura de sistemas e escolher as melhores ferramentas para sua operação.",
  },
];

export default function Services() {
  return (
    <section id="services-page" className={styles.section}>
      <TitleSection
        title="NOSSOS SERVIÇOS"
        subtitle="Sistemas, automações e inteligência artificial sob medida para o seu negócio"
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
