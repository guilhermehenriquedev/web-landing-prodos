"use client";

import styles from "@/shared/components/TitleSection/TitleSection.module.scss";

//Components
import MotionController from "@/shared/components/MotionController";

export default function TitleSection({ title, subtitle, compact }) {
  const rootClass = [
    styles.containerTitleSection,
    compact ? styles.containerTitleSectionCompact : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <MotionController className={rootClass}>
      <div className={styles.containerTexts}>
        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.subtitle}>{subtitle}</h3>
      </div>

      <div className={styles.gradientLine}></div>
    </MotionController>
  );
}
