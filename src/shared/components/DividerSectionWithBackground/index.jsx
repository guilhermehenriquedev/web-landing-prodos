"use client";

import styles from "@/shared/components/DividerSectionWithBackground/styles.module.scss";

//Components
import MotionController from "@/shared/components/MotionController";

export default function DividerSectionWithBackground() {
  return (
    <MotionController className={styles.section}>
      <div className={styles.content}></div>
    </MotionController>
  );
}
