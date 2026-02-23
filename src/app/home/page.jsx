"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

import styles from "./home.module.scss";

//Components
import MotionController from "@/shared/components/MotionController";

//Lotties
import ScrollDown from "../../../public/lotties/scroll-down.json";

var defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ScrollDown,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Home() {
  return (
    <div className={styles.section}>
      <MotionController className={styles.content}>
        <h1 className={styles.textBrand}>PRÓDOS DIGITAL</h1>
        <h2 className={styles.text}>
          Sistemas sob medida e automações com Inteligência Artificial
        </h2>
        <h4>
          Desenvolvemos sistemas sob demanda, automações de processos e
          soluções com IA para otimizar sua operação e escalar resultados
        </h4>
        <a href="#about-page">SAIBA MAIS</a>

        <div className={styles.lottieContainer}>
          <Lottie
            options={defaultOptions}
            height={"100%"}
            width={"100%"}
            isStopped={false}
            isPaused={false}
            isClickToPauseDisabled={true}
          />
        </div>
      </MotionController>
    </div>
  );
}
