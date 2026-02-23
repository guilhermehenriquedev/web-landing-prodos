"use client";
import Image from "next/image";
import styles from "./solucoes.module.scss";

//Components
import TitleSection from "@/shared/components/TitleSection";
import MotionController from "@/shared/components/MotionController";

//Icons
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

//Constants
import { SOLUTIONS } from "@/shared/constants";

function SolutionCard({ solution }) {
  const { name, description, image, link } = solution;

  const linkLabel = (
    <span className={styles.link}>
      Conhecer <HiOutlineArrowTopRightOnSquare />
    </span>
  );

  const content = (
    <>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className={styles.cardContent}>
        <h4 className={styles.cardTitle}>{name}</h4>
        <p className={styles.cardDescription}>{description}</p>
        {link && linkLabel}
      </div>
    </>
  );

  if (link) {
    return (
      <MotionController className={styles.card}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          {content}
        </a>
      </MotionController>
    );
  }

  return (
    <MotionController className={styles.card}>
      <div className={styles.cardInner}>{content}</div>
    </MotionController>
  );
}

export default function Solucoes() {
  return (
    <section id="solutions-page" className={styles.section}>
      <TitleSection
        title="NOSSAS SOLUÇÕES"
        subtitle="Sistemas prontos para acelerar sua operação"
      />

      <div className={styles.grid}>
        {SOLUTIONS.map((solution) => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>
    </section>
  );
}
