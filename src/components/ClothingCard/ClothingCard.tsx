import { useState, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import styles from "./ClothingCard.module.css";
import { Check, Heart, MoreVertical, X } from "lucide-react";
import type { ClothingItem } from "../../types/clothing";

export type ClothingCardProps = ClothingItem & {
  onToggleFavorite?: (id: string) => void;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (clothing: ClothingItem) => void;
  onDelete?: (id: string) => void;
};

function ClothingCard(props: ClothingCardProps) {
  const {
    id,
    name,
    image,
    category,
    isFavorite,
    size,
    color,
    onToggleFavorite,
    onRemove,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isSelectable = typeof onSelect === "function";
  const hasMenu = typeof onEdit === "function" || typeof onDelete === "function";

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleCardClick = () => {
    if (isSelectable) {
      onSelect(id);
    }
  };

  return (
    <div
      className={`${styles.card} ${isSelectable ? styles.selectable : ""} ${isSelected ? styles.cardSelected : ""}`}
      onClick={handleCardClick}
      role={isSelectable ? "checkbox" : undefined}
      aria-checked={isSelectable ? isSelected : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      onKeyDown={
        isSelectable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(id);
              }
            }
          : undefined
      }
    >
      {isSelectable ? (
        <div
          className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ""}`}
        >
          {isSelected && <Check size={16} strokeWidth={3} />}
        </div>
      ) : (
        <>
          {onRemove && (
            <button
              className={styles.remove}
              type="button"
              aria-label="Remove from collection"
              title="Remove from collection"
              onClick={(event) => {
                event.stopPropagation();
                onRemove(id);
              }}
            >
              <X size={18} />
            </button>
          )}

          <div className={styles.topActions}>
            {onToggleFavorite && (
              <button
                className={styles.favorite}
                type="button"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleFavorite(id);
                }}
              >
                <Heart
                  size={18}
                  color="#BA002B"
                  fill={isFavorite ? "#BA002B" : "none"}
                />
              </button>
            )}

            {hasMenu && (
              <div className={styles.menuContainer} ref={menuRef}>
                <button
                  type="button"
                  className={styles.moreOption}
                  aria-label="More options"
                  onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    setIsMenuOpen((prev) => !prev);
                  }}
                >
                  <MoreVertical size={18} color="#BA002B" />
                </button>

                {isMenuOpen && (
                  <div
                    className={styles.menu}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {onEdit && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          onEdit({
                            id,
                            name,
                            image,
                            category,
                            isFavorite,
                            size,
                            color,
                          });
                        }}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className={styles.deleteOption}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          onDelete(id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      <img src={image} alt={category} className={styles.image} />
    </div>
  );
}

export default ClothingCard;

