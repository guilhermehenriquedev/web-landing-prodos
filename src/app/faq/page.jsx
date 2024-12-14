"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

import styles from "./styles.module.scss";

//Lotties
import FaqAnimation from "../../../public/lotties/faq.json";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

//Constants
import { FAQ_QUESTIONS } from "@/shared/constants";

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <MotionController className={styles.accordionItem}>
    <div
      className={`${styles.question} ${isOpen ? styles.openTitle : ""} ${
        isOpen ? styles.openTitle : ""
      }`}
      onClick={onClick}
    >
      <p className={isOpen ? styles.openTitle : styles.closeParagraph}>
        {question}
      </p>
      <div className={styles.boxIcon}>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>

    <div
      className={styles.answer}
      style={{
        maxHeight: isOpen ? "1000px" : "0",
        transition: "all 0.3s ease",
      }}
    >
      <p>{answer}</p>
    </div>
  </MotionController>
);

const PERGUNTAS = [
  { id: 1, pergunta: "title", resposta: "pergunta" },
  { id: 2, pergunta: "title", resposta: "pergunta" },
  { id: 3, pergunta: "title", resposta: "pergunta" },
  { id: 4, pergunta: "title", resposta: "pergunta" },
  { id: 5, pergunta: "title", resposta: "pergunta" },
  { id: 6, pergunta: "title", resposta: "pergunta" },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {FAQ_QUESTIONS.map((item, index) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        />
      ))}
    </>
  );
};

var defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: FaqAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function FaqQuestions() {
  return (
    <section id="faq-page" className={styles.section}>
      <TitleSection
        title="PERGUNTAS FREQUENTES (FAQ)"
        subtitle="Tire suas dúvidas sobre os serviços prestados"
      />
      <div className={styles.content}>
        <div className={styles.faq}>
          <Accordion />
        </div>

        <div className={styles.containerImage}>
          <Lottie
            options={defaultOptions}
            height={"340px"}
            width={"300px"}
            isStopped={false}
            isPaused={false}
            isClickToPauseDisabled={true}
          />
        </div>
      </div>
    </section>
  );
}
