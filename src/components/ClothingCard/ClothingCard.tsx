import styles from "./ClothingCard.module.css";
import { Heart } from "lucide-react";
import type { ClothingItem } from "../../types/clothing";

type ClothingCardProps = ClothingItem;

function ClothingCard({ image, category, isFavorite }: ClothingCardProps) {
  return (
    <div className={styles.card}>
      <button
        className={styles.favorite}
        type="button"
        aria-label="Add to favorites"
      >
        <Heart
          size={20}
          color="#BA002B"
          fill={isFavorite ? "#BA002B" : "none"}
        />
      </button>
      <img src={image} alt={category} className={styles.image} />
    </div>
  );
}

export default ClothingCard;
