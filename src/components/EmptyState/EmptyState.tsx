import styles from "./EmptyState.module.css";

function EmptyState() {
  return (
    <div className={styles.container} >
      <h1>No clothes found🤔</h1>
      <p>Try another search or category.</p>
    </div>
  );
}

export default EmptyState;
