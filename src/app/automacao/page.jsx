"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import styles from "./styles.module.scss";
import TitleSection from "@/shared/components/TitleSection";

const nodes = [
  { id: "input", label: "Contexto do Negócio", icon: "⬡", col: 0, row: 1 },
  { id: "ai", label: "Agente de IA Dedicado", icon: "✦", col: 1, row: 1 },
  { id: "auto", label: "Processo Automatizado", icon: "⟳", col: 2, row: 0 },
  { id: "int", label: "Sistema Integrado", icon: "⇄", col: 2, row: 2 },
  { id: "out", label: "Resultado Real", icon: "✓", col: 3, row: 1 },
];

const edges = [
  ["input", "ai"],
  ["ai", "auto"],
  ["ai", "int"],
  ["auto", "out"],
  ["int", "out"],
];

const COL_W = 232;
const ROW_H = 128;
const NODE_W = 162;
const NODE_H = 74;
const SVG_W = 4 * COL_W + NODE_W;
const SVG_H = 3 * ROW_H + NODE_H;

function nodeCenter(node) {
  return {
    x: node.col * COL_W + NODE_W / 2,
    y: node.row * ROW_H + NODE_H / 2 + ROW_H / 2,
  };
}

const stats = [
  { value: "100%", label: "Personalizado para o seu negócio" },
  { value: "24/7", label: "Agente operando de forma autônoma" },
  { value: "0", label: "Respostas genéricas de IA" },
  { value: "∞", label: "Escalabilidade sem aumentar equipe" },
];

export default function AutomationFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className={styles.section} ref={ref}>
      <TitleSection
        compact
        title="AGENTES DE IA DEDICADOS"
        subtitle="Não usamos IA genérica — criamos agentes treinados para operar dentro do seu negócio"
      />

      {/* Flow diagram — desktop only */}
      <div className={styles.diagram}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className={styles.svg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Edges */}
          {edges.map(([fromId, toId], i) => {
            const from = nodes.find((n) => n.id === fromId);
            const to = nodes.find((n) => n.id === toId);
            const f = nodeCenter(from);
            const t = nodeCenter(to);
            const mx = (f.x + t.x) / 2;
            const d = `M ${f.x} ${f.y} C ${mx} ${f.y}, ${mx} ${t.y}, ${t.x} ${t.y}`;
            return (
              <motion.path
                key={i}
                d={d}
                stroke="rgba(229,190,91,0.3)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              />
            );
          })}

          {/* Animated dots on edges */}
          {isInView &&
            edges.map(([fromId, toId], i) => {
              const from = nodes.find((n) => n.id === fromId);
              const to = nodes.find((n) => n.id === toId);
              const f = nodeCenter(from);
              const t = nodeCenter(to);
              const mx = (f.x + t.x) / 2;
              const d = `M ${f.x} ${f.y} C ${mx} ${f.y}, ${mx} ${t.y}, ${t.x} ${t.y}`;
              return (
                <motion.circle
                  key={`dot-${i}`}
                  r="3"
                  fill="#e5be5b"
                  opacity={0.8}
                >
                  <animateMotion
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={d}
                    begin={`${i * 0.5}s`}
                  />
                </motion.circle>
              );
            })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const { x, y } = nodeCenter(node);
            return (
              <motion.g
                key={node.id}
                transform={`translate(${x - NODE_W / 2}, ${y - NODE_H / 2})`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill="rgba(15, 15, 15, 0.92)"
                  stroke="rgba(229,190,91,0.3)"
                  strokeWidth="1.5"
                />
                <text
                  x={NODE_W / 2}
                  y={26}
                  textAnchor="middle"
                  fill="#e5be5b"
                  fontSize="30"
                  dominantBaseline="middle"
                >
                  {node.icon}
                </text>
                <text
                  x={NODE_W / 2}
                  y={50}
                  textAnchor="middle"
                  fill="#eeeeee"
                  fontSize="11.5"
                  fontFamily="sans-serif"
                  letterSpacing="0.5"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Flow diagram — mobile only */}
      <div className={styles.diagramMobile}>
        {/* Row 1: Input */}
        <motion.div
          className={styles.mobileNode}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <span className={styles.mobileIcon}>⬡</span>
          <span className={styles.mobileLabel}>Contexto do Negócio</span>
        </motion.div>

        <div className={styles.mobileConnector} />

        {/* Row 2: AI */}
        <motion.div
          className={`${styles.mobileNode} ${styles.mobileNodeHighlight}`}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <span className={styles.mobileIcon}>✦</span>
          <span className={styles.mobileLabel}>Agente de IA Dedicado</span>
        </motion.div>

        {/* Branch connectors */}
        <div className={styles.mobileBranchConnectors}>
          <div className={styles.mobileBranchLine} />
          <div className={styles.mobileBranchLine} />
        </div>

        {/* Row 3: two branches side by side */}
        <div className={styles.mobileBranchRow}>
          <motion.div
            className={styles.mobileNode}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.6 }}
          >
            <span className={styles.mobileIcon}>⟳</span>
            <span className={styles.mobileLabel}>Processo Automatizado</span>
          </motion.div>
          <motion.div
            className={styles.mobileNode}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.75 }}
          >
            <span className={styles.mobileIcon}>⇄</span>
            <span className={styles.mobileLabel}>Sistema Integrado</span>
          </motion.div>
        </div>

        {/* Merge connectors */}
        <div className={styles.mobileBranchConnectors}>
          <div className={styles.mobileBranchLine} />
          <div className={styles.mobileBranchLine} />
        </div>

        {/* Row 4: Output */}
        <motion.div
          className={`${styles.mobileNode} ${styles.mobileNodeOut}`}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.9 }}
        >
          <span className={styles.mobileIcon}>✓</span>
          <span className={styles.mobileLabel}>Resultado Real</span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className={styles.stat}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1 + i * 0.12 }}
          >
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
