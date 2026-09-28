import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
};

function EmptyState({
  title = "No clothes found🤔",
  description = "Try another search or category.",
  action,
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
