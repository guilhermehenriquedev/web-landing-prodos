"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MotionController({
  className,
  children,
  index = 0,
  once = true,
  direction = "up",
  delay = 0,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once });

  const initialValues = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: -70 },
    right: { opacity: 0, x: 70 },
  };

  const animateValues = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialValues[direction]}
      animate={isInView ? animateValues[direction] : initialValues[direction]}
      transition={{ duration: 0.6, delay: index * 0.2 + delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
