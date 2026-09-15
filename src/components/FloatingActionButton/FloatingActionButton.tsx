import styles from "./FloatingActionButton.module.css";

type FloatingAcionButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
};

function FloatingActionButton({
  icon,
  onClick,
  ariaLabel,
}: FloatingAcionButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {icon}
    </button>
  );
}

export default FloatingActionButton;
