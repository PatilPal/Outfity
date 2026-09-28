import styles from "./ClothingCard.module.css";
import { Check, Heart, X } from "lucide-react";
import type { ClothingItem } from "../../types/clothing";

export type ClothingCardProps = ClothingItem & {
  onToggleFavorite?: (id: string) => void;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
};

function ClothingCard({
  id,
  image,
  category,
  isFavorite,
  onToggleFavorite,
  onRemove,
  isSelected,
  onSelect,
}: ClothingCardProps) {
  const isSelectable = typeof onSelect === "function";

  const handleCardClick = () => {
    if (isSelectable) {
      onSelect(id);
    }
  };

  return (
    <div
      className={`${styles.card} ${isSelectable ? styles.selectable : ""} ${isSelected ? styles.cardSelected : ""}`}
      onClick={handleCardClick}
      role={isSelectable ? "checkbox" : undefined}
      aria-checked={isSelectable ? isSelected : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      onKeyDown={
        isSelectable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(id);
              }
            }
          : undefined
      }
    >
      {isSelectable ? (
        <div
          className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ""}`}
        >
          {isSelected && <Check size={16} strokeWidth={3} />}
        </div>
      ) : (
        <>
          {onRemove && (
            <button
              className={styles.remove}
              type="button"
              aria-label="Remove from collection"
              title="Remove from collection"
              onClick={(event) => {
                event.stopPropagation();
                onRemove(id);
              }}
            >
              <X size={18} />
            </button>
          )}

          {onToggleFavorite && (
            <button
              className={styles.favorite}
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite(id);
              }}
            >
              <Heart
                size={20}
                color="#BA002B"
                fill={isFavorite ? "#BA002B" : "none"}
              />
            </button>
          )}
        </>
      )}
      <img src={image} alt={category} className={styles.image} />
    </div>
  );
}

export default ClothingCard;
