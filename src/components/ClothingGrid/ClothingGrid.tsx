import ClothingCard from "../ClothingCard/ClothingCard";
import type { ClothingItem } from "../../types/clothing";
import styles from "./ClothingGrid.module.css";

type ClothingGridProps = {
  items: ClothingItem[];
  onToggleFavorite?: (id: string) => void;
  onRemove?: (id: string) => void;
  selectedIds?: string[];
  onSelect?: (id: string) => void;
  onEdit?: (clothing: ClothingItem) => void;
  onDelete?: (id: string) => void;
};

function ClothingGrid({
  items,
  onToggleFavorite,
  onRemove,
  selectedIds,
  onSelect,
  onEdit,
  onDelete,
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
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ClothingGrid;
