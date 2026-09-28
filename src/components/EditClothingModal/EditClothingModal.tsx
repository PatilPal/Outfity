import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import type { ClothingItem } from "../../types/clothing";
import styles from "./EditClothingModal.module.css";

const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Shoes", "Accessories"];

type EditClothingModalProps = {
  isOpen: boolean;
  clothing: ClothingItem | null;
  onClose: () => void;
  onSave: (updatedClothing: ClothingItem) => void;
};

export default function EditClothingModal({
  isOpen,
  clothing,
  onClose,
  onSave,
}: EditClothingModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tops");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (clothing) {
      setName(clothing.name || "");
      setCategory(clothing.category || "Tops");
      setSize(clothing.size || "");
      setColor(clothing.color || "");
    }
  }, [clothing]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !clothing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      ...clothing,
      name: name.trim(),
      category,
      size: size.trim() || undefined,
      color: color.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-clothing-title"
      >
        <div className={styles.header}>
          <div>
            <h2 id="edit-clothing-title" className={styles.title}>
              Edit Clothing
            </h2>
            <p className={styles.subtitle}>
              Update details for this item
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.imageSection}>
            <img
              src={clothing.image}
              alt={clothing.name}
              className={styles.previewImage}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="edit-clothing-name" className={styles.label}>
              Name *
            </label>
            <input
              id="edit-clothing-name"
              type="text"
              className={styles.input}
              placeholder="e.g. White Shirt"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="edit-clothing-category" className={styles.label}>
                Category / Type
              </label>
              <select
                id="edit-clothing-category"
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="edit-clothing-size" className={styles.label}>
                Size
              </label>
              <input
                id="edit-clothing-size"
                type="text"
                className={styles.input}
                placeholder="e.g. S, M, 32"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="edit-clothing-color" className={styles.label}>
              Color
            </label>
            <input
              id="edit-clothing-color"
              type="text"
              className={styles.input}
              placeholder="e.g. Burgundy, Navy, White"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!name.trim()}
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
