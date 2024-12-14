"use client";

import styles from "@/shared/components/ButtonAnchor/ButtonAnchor.module.scss";

export default function ButtonAnchor({
  label,
  pathUrl,
  icon,
  contrastButton,
  disabled,
}) {
  const classNames = `
    ${contrastButton ? styles.anchorButtonContrast : styles.anchorButton}
    ${disabled ? styles.disabled : ""}
  `;

  return disabled ? (
    <div className={classNames}>
      {label}
      {icon && icon}
    </div>
  ) : (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={pathUrl || "#"}
      className={classNames}
    >
      {label}
      {icon && icon}
    </a>
  );
}
