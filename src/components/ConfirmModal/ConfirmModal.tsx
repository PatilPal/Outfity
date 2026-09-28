import { useEffect } from "react";
import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  isOpen,
  title = "Delete Collection?",
  message = "Are you sure you want to delete this collection?",
  confirmLabel = "Delete",
  onClose,
  onConfirm,
}: ConfirmModalProps) {
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.confirmOverlay} onClick={onClose}>
      <div
        className={styles.confirmModal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          type="button"
          className={styles.confirmClose}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <h2 id="confirm-modal-title">{title}</h2>

        <p>{message}</p>

        <div className={styles.confirmActions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}