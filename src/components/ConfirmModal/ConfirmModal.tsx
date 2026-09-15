import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.confirmOverlay}>
      <div className={styles.confirmModal}>
        <button className={styles.confirmClose} onClick={onClose}>
          ×
        </button>

        <h2>Delete Collection?</h2>

        <p>Are you sure you want to delete this collection?</p>

        <div className={styles.confirmActions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}