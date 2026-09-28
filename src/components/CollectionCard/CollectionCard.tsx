import { useState } from "react";
import styles from "./CollectionCard.module.css";
import type { Collection } from "../../types/collection";
import { MoreVertical } from "lucide-react";
import type { MouseEvent } from "react"; 

type CollectionCardProps = {
  collection: Collection;
  onDelete: (id: string) => void;
  onClick?: (id: string) => void;
};

function CollectionCard({
  collection,
  onDelete,
  onClick,
}: CollectionCardProps) {
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
        onClick ={(event: MouseEvent<HTMLButtonElement>) => {event.stopPropagation();;
          setIsMenuOpen((previous) => !previous)}}
      >
        <MoreVertical size={18} color="#BA002B" />
      </button>
      {isMenuOpen && (
        <div className={styles.menu}>
          <button
            type="button"
            onClick={() => onClick && onClick(collection.id)}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              onDelete(collection.id);
            }}
          >
            Delete
          </button>
        </div>
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{collection.name}</h2>
        <p className={styles.count}>{collection.clothingIds.length} items</p>
      </div>
    </div>
  );
}

export default CollectionCard;
