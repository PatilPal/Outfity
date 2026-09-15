import { useState } from "react";
import styles from "./CreateCollectionModal.module.css";

type CreateCollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

function CreateCollectionModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCollectionModalProps) {
  const [collectionName, setCollectionName] = useState("");

  const handleCreate = () => {
    if (!collectionName.trim()) return;

    onCreate(collectionName);
    setCollectionName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} >
        <h2 className={styles.title} >Create Collection</h2>

        <input
          className={styles.input}
          type="text"
          placeholder="Enter collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
        ></input>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => {
              setCollectionName("");
              onClose();
            }}
          >
            Cancel
          </button>

          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
      onClose();
    </div>
  );
}

export default CreateCollectionModal;
