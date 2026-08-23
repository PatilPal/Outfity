import ClothingCard from "../ClothingCard/ClothingCard";
import type { ClothingItem } from "../../types/clothing";
import styles from "./ClothingGrid.module.css";

type ClothingGridProps = {
  items: ClothingItem[];
  onToggleFavorite:(id:string) =>  void;
};

function ClothingGrid({ items, onToggleFavorite }: ClothingGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ClothingCard key={item.id} {...item} 
        onToggleFavorite={onToggleFavorite}/>
      ))}
    </div>
  );
}

export default ClothingGrid;
