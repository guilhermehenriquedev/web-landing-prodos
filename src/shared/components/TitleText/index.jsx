"use client";

import styles from "@/shared/components/TitleText/TitleText.module.scss";

export default function TitleText({ children }) {
  return <h3 className={styles.titleText}>{children}</h3>;
}
