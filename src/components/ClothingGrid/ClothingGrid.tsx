import ClothingCard from "../ClothingCard/ClothingCard";
import type { ClothingItem } from "../../types/clothing";
import styles from "./ClothingGrid.module.css";

type ClothingGridProps = {
  items: ClothingItem[];
  onToggleFavorite?: (id: string) => void;
  onRemove?: (id: string) => void;
  selectedIds?: string[];
  onSelect?: (id: string) => void;
};

function ClothingGrid({
  items,
  onToggleFavorite,
  onRemove,
  selectedIds,
  onSelect,
}: ClothingGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ClothingCard
          key={item.id}
          {...item}
          onToggleFavorite={onToggleFavorite}
          onRemove={onRemove}
          isSelected={selectedIds ? selectedIds.includes(item.id) : undefined}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ClothingGrid;
