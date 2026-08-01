import ClothingCard from "../ClothingCard/ClothingCard";
import type { ClothingItem } from "../../types/clothing";
import styles from "./ClothingGrid.module.css";

type ClothingGridProps = {
  items: ClothingItem[];
};

function ClothingGrid({ items }: ClothingGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ClothingCard key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ClothingGrid;
