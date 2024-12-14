"use client";

import styles from "./portfolio.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import ButtonAnchor from "@/shared/components/ButtonAnchor";
import MotionController from "@/shared/components/MotionController";

export default function Portfolio() {
  return (
    <section id="portfolio-page" className={styles.section}>
      <TitleSection
        title="PORTFÓLIO"
        subtitle="Navegue pelos nossos projetos"
      />

      <div className={styles.containerProjects}>
        {[1, 2, 3, 4, 5, 6].map((project, index) => (
          <MotionController key={index} className={styles.project}>
            <div className={styles.containerImage}></div>
            <div className={styles.contentProject}>
              <div>
                <h3>TÍTULO DO PROJETO</h3>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry
                </p>
              </div>
              <ButtonAnchor label="DEMONSTRAÇÃO" hasIcon />
            </div>
          </MotionController>
        ))}
      </div>
    </section>
  );
}
