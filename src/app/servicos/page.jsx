"use client";
import { useRef } from "react";
import styles from "./services.module.scss";
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

import { MdDeveloperMode } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { TbBuildingFactory2 } from "react-icons/tb";

const cards = [
  {
    id: 1,
    icon: <MdDeveloperMode />,
    title: "Sistemas sob demanda",
    description:
      "Desenvolvemos sistemas web e mobile exclusivos para o seu negócio: ERPs, CRMs, portais, dashboards e plataformas desenhados do zero para se adaptar às suas regras e processos.",
    tags: ["Web", "Mobile", "ERP", "CRM"],
  },
  {
    id: 2,
    icon: <RiRobot2Fill />,
    title: "Agentes de IA personalizados",
    description:
      "Criamos agentes de IA dedicados e treinados para a realidade do seu negócio — que entendem o seu contexto, operam nos seus fluxos e entregam resultados concretos, não respostas genéricas.",
    tags: ["IA Dedicada", "LLM", "Fluxo próprio"],
  },
  {
    id: 3,
    icon: <TbBuildingFactory2 />,
    title: "Automação de processos",
    description:
      "Mapeamos e automatizamos processos empresariais repetitivos e críticos, eliminando retrabalho, reduzindo erros e liberando sua equipe para o que realmente importa.",
    tags: ["BPA", "RPA", "Integrações"],
  },
];

function TiltCard({ card, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.025)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <MotionController index={index} delay={0.05} className={styles.cardWrapper}>
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.cardGlow} />
        <div className={styles.boxIcon}>{card.icon}</div>
        <h4 className={styles.cardTitle}>{card.title.toUpperCase()}</h4>
        <p className={styles.cardContent}>{card.description}</p>
        <div className={styles.tags}>
          {card.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.cardBorder} />
      </div>
    </MotionController>
  );
}

export default function Services() {
  return (
    <section id="services-page" className={styles.section}>
      <TitleSection
        title="O QUE FAZEMOS"
        subtitle="Três frentes de atuação, um único objetivo: resultado real para o seu negócio"
      />
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <TiltCard key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
