import CollectionCard from "../CollectionCard/CollectionCard";
import type { Collection } from "../../types/collection";
import styles from "./CollectionsView.module.css"

type CollectionGridProps = {
  items: Collection[];
  onDelete: (id: string) => void; 
};
export default function CollectionsView({ items, onDelete }: CollectionGridProps) {
  return (
    <div className={styles.grid}> 
      {items.map((item) => (
        <CollectionCard key={item.id} collection={item} onDelete={onDelete}/>
      ))}
    </div>
  );
}
