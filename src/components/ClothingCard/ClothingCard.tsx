import styles from "./ClothingCard.module.css";
import { Heart } from "lucide-react";
import type { ClothingItem } from "../../types/clothing";

type ClothingCardProps = ClothingItem & {
  onToggleFavorite: (id: string) => void;
};

function ClothingCard({id, image, category, isFavorite, onToggleFavorite}: ClothingCardProps) {
  return (
    <div className={styles.card}>
      <button
        className={styles.favorite}
        type="button"
        aria-label="Add to favorites"
        onClick={() => onToggleFavorite(id)}
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
