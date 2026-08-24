import styles from "./CollectionCard.module.css";
import type { Collection } from "../../types/collection";

type CollectionCardProps = {
  collection: Collection;
};

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className={styles.card}>
      <img
        src={collection.coverImage}
        alt={collection.name}
        className={styles.image}
      />

      <div className={styles.content}>
        <p className={styles.title}>{collection.name}</p>      
        <p className={styles.count}>
          {collection.clothesCount} items
        </p>
      </div>
    </div>
  );
}

export default CollectionCard;