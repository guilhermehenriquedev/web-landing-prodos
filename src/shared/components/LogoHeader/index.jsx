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
          src="/img/logo.png"
          alt="Logomarca da Pródos digital"
          width={70}
          height={70}
          quality={100}
        />
        <span className={styles.brandName}>PRÓDOS DIGITAL</span>
      </MotionController>
    </Link>
  );
}
