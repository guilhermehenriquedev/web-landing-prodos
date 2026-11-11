"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "@/shared/components/LogoHeader/LogoHeader.module.scss";

//Components
import MotionController from "@/shared/components/MotionController";

export default function LogoHeader() {
  return (
    <Link href="#home-page">
      <MotionController className={styles.container}>
        <Image
          src="/img/logo.svg"
          alt="Logomarca da Pródos digital"
          width={70}
          height={54}
          quality={100}
        />
        <span className={styles.brandName}>PRÓDOS DIGITAL</span>
      </MotionController>
    </Link>
  );
}
