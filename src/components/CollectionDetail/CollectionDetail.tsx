import { useState } from "react";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import ClothingGrid from "../ClothingGrid/ClothingGrid";
import EmptyState from "../EmptyState/EmptyState";
import AddClothesModal from "../AddClothesModal/AddClothesModal";
import type { ClothingItem } from "../../types/clothing";
import type { Collection } from "../../types/collection";
import styles from "./CollectionDetail.module.css";

type CollectionDetailProps = {
  collection: Collection;
  clothes: ClothingItem[];
  onBack: () => void;
  onAddClothes: (clothingIds: string[]) => void;
  onRemoveClothing: (clothingId: string) => void;
  onToggleFavorite?: (clothingId: string) => void;
};

export default function CollectionDetail({
  collection,
  clothes,
  onBack,
  onAddClothes,
  onRemoveClothing,
  onToggleFavorite,
}: CollectionDetailProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const collectionClothes = clothes.filter((clothing) =>
    collection.clothingIds.includes(clothing.id)
  );

  const availableClothes = clothes.filter(
    (clothing) => !collection.clothingIds.includes(clothing.id)
  );

  const coverImageSrc =
    collection.coverImage || (collectionClothes[0]?.image ?? "");

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
        aria-label="Back to collections"
      >
        <ArrowLeft size={18} />
        <span>Back to collections</span>
      </button>

      <div className={styles.headerCard}>
        <div className={styles.headerLeft}>
          <div className={styles.coverWrapper}>
            {coverImageSrc ? (
              <img
                src={coverImageSrc}
                alt={collection.name}
                className={styles.coverImage}
              />
            ) : (
              <div className={styles.coverPlaceholder}>
                <Sparkles size={32} />
              </div>
            )}
          </div>

          <div className={styles.meta}>
            <span className={styles.badge}>Collection</span>
            <h1 className={styles.title}>{collection.name}</h1>
            <p className={styles.count}>
              {collection.clothingIds.length}{" "}
              {collection.clothingIds.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className={styles.addClothesButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} />
          <span>Add Clothes</span>
        </button>
      </div>

      {collectionClothes.length > 0 ? (
        <ClothingGrid
          items={collectionClothes}
          onToggleFavorite={onToggleFavorite}
          onRemove={onRemoveClothing}
        />
      ) : (
        <EmptyState
          title="No clothes in this collection yet"
          description="Add pieces from your closet to start styling this collection."
          action={
            <button
              type="button"
              className={styles.emptyAddButton}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={18} />
              <span>Add Clothes</span>
            </button>
          }
        />
      )}

      <AddClothesModal
        isOpen={isAddModalOpen}
        collectionName={collection.name}
        availableClothes={availableClothes}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddClothes}
      />
    </div>
  );
}