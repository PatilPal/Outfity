import { useState } from "react";
import styles from "./CollectionCard.module.css";
import type { Collection } from "../../types/collection";
import { MoreVertical } from "lucide-react";

type CollectionCardProps ={
  collection: Collection;
  onDelete: (id: string)=> void;
};

function CollectionCard({ collection, onDelete }: CollectionCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.card}>
      <img
        src={collection.coverImage}
        alt={collection.name}
        className={styles.image}
      />
      <button
        type="button"
        className={styles.moreOption}
        onClick={() => setIsMenuOpen((previous) => !previous)}
      >
        <MoreVertical size={18} color="#BA002B" />
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <button type="button">Edit</button>
          <button type="button"
          onClick={()=> onDelete(collection.id)}>Delete</button>
        </div>
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{collection.name}</h2>
        <p className={styles.count}>{collection.clothesCount} items</p>
      </div>
    </div>
  );
}

export default CollectionCard;
