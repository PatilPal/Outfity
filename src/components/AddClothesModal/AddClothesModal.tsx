import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import ClothingGrid from "../ClothingGrid/ClothingGrid";
import EmptyState from "../EmptyState/EmptyState";
import type { ClothingItem } from "../../types/clothing";
import styles from "./AddClothesModal.module.css";

type AddClothesModalProps = {
  isOpen: boolean;
  collectionName: string;
  availableClothes: ClothingItem[];
  onClose: () => void;
  onAdd: (clothingIds: string[]) => void;
};

export default function AddClothesModal({
  isOpen,
  collectionName,
  availableClothes,
  onClose,
  onAdd,
}: AddClothesModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedIds([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIds([]);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    if (selectedIds.length === 0) return;
    onAdd(selectedIds);
    setSelectedIds([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedIds([]);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-clothes-title"
      >
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 id="add-clothes-title" className={styles.title}>
              Add Clothes
            </h2>
            <p className={styles.subtitle}>
              Select clothes to add to {collectionName}
            </p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {availableClothes.length > 0 ? (
            <ClothingGrid
              items={availableClothes}
              selectedIds={selectedIds}
              onSelect={handleToggleSelect}
            />
          ) : (
            <EmptyState
              title="All clothes added"
              description="All items from your closet are already in this collection."
            />
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.countInfo}>
            {selectedIds.length > 0 ? (
              <span>
                {selectedIds.length} item{selectedIds.length > 1 ? "s" : ""}{" "}
                selected
              </span>
            ) : (
              <span>Choose items to add</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={handleConfirm}
              disabled={selectedIds.length === 0}
            >
              <Plus size={16} />
              <span>
                Add {selectedIds.length > 0 ? `(${selectedIds.length})` : ""}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
