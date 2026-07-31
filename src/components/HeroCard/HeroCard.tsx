import styles from "./HeroCard.module.css";

type HeroCardProps = {
  image: string;
  label: string;
  title: string;
};

function HeroCard({ image, label, title }: HeroCardProps) {
  return (
    <div className={styles.heroCard}>
      <img src={image} alt={title} />
      <div className={styles.overlay}>
        <p className={styles.label}>{label}</p>
        <h2>{title}</h2>
        <button>WEAR NOW</button>
      </div>
    </div>
  );
}
export default HeroCard;