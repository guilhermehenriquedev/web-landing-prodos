"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import styles from "./home.module.scss";

// Canvas component — SSR disabled because it needs window/ResizeObserver
const ParticleBackground = dynamic(
  () => import("@/shared/components/ParticleBackground"),
  { ssr: false }
);

function MagneticButton({ children, href, className }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <a
      ref={btnRef}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Home() {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <div ref={sectionRef} className={styles.section}>
      {/* 3D particle field */}
      <ParticleBackground />

      {/* Radial glow center */}
      <div className={styles.glow} />

      {/* Parallax content */}
      <motion.div
        className={styles.content}
        style={{ y: parallaxY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className={styles.subtitle} variants={itemVariants}>
          Sistemas sob demanda, agentes de IA personalizados e automação de processos para o seu negócio
        </motion.h2>

        <motion.p className={styles.description} variants={itemVariants}>
          Desenvolvemos soluções sob medida — desde sistemas completos até
          agentes de IA dedicados que aprendem e operam dentro da realidade
          da sua empresa.
        </motion.p>

        <motion.div className={styles.actions} variants={itemVariants}>
          <MagneticButton href="#about-page" className={styles.ctaPrimary}>
            CONHEÇA NOSSOS SERVIÇOS
          </MagneticButton>
          <a href="#contacts-page" className={styles.ctaSecondary}>
            FALAR COM ESPECIALISTA
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <span className={styles.scrollLine} />
      </motion.div>
    </div>
  );
}
