import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { Camera, Image as ImageIcon, Plus, X } from "lucide-react";
import styles from "./AddClothingModal.module.css";

const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Shoes", "Accessories"];

type AddClothingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (clothing: {
    name: string;
    image: string;
    category: string;
    size?: string;
    color?: string;
  }) => void;
};

export default function AddClothingModal({
  isOpen,
  onClose,
  onAdd,
}: AddClothingModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tops");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const resetForm = () => {
    stopCameraStream();
    setName("");
    setCategory("Tops");
    setSize("");
    setColor("");
    setImage("");
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetForm();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopCameraStream();
    };
  }, [isOpen, onClose]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        stopCameraStream();
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleStartCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cameraInputRef.current?.click();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      cameraInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraActive]);

  const handleSnapPhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setImage(dataUrl);
    }
    stopCameraStream();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image) return;

    onAdd({
      name: name.trim(),
      category,
      size: size.trim() || undefined,
      color: color.trim() || undefined,
      image,
    });

    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={() => {
        resetForm();
        onClose();
      }}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-clothing-title"
      >
        <div className={styles.header}>
          <div>
            <h2 id="add-clothing-title" className={styles.title}>
              Add Clothing
            </h2>
            <p className={styles.subtitle}>
              Add a new item to your wardrobe
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => {
              resetForm();
              onClose();
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.imageSection}>
            {isCameraActive ? (
              <div className={styles.cameraBox}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className={styles.videoStream}
                />
                <div className={styles.cameraControls}>
                  <button
                    type="button"
                    className={styles.snapBtn}
                    onClick={handleSnapPhoto}
                  >
                    Snap Photo
                  </button>
                  <button
                    type="button"
                    className={styles.cancelCameraBtn}
                    onClick={stopCameraStream}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : image ? (
              <div className={styles.previewContainer}>
                <img
                  src={image}
                  alt="Clothing preview"
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  className={styles.changeImageBtn}
                  onClick={() => setImage("")}
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className={styles.uploadPrompt}>
                <p className={styles.uploadTitle}>Choose an image</p>
                <div className={styles.mediaButtons}>
                  <button
                    type="button"
                    className={styles.mediaBtn}
                    onClick={() => galleryInputRef.current?.click()}
                  >
                    <ImageIcon size={20} />
                    <span>Gallery</span>
                  </button>
                  <button
                    type="button"
                    className={styles.mediaBtn}
                    onClick={handleStartCamera}
                  >
                    <Camera size={20} />
                    <span>Camera</span>
                  </button>
                </div>
              </div>
            )}

            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className={styles.hiddenInput}
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="clothing-name" className={styles.label}>
              Name *
            </label>
            <input
              id="clothing-name"
              type="text"
              className={styles.input}
              placeholder="e.g. Silk Ivory Blouse"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="clothing-category" className={styles.label}>
                Category / Type
              </label>
              <select
                id="clothing-category"
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
              <label htmlFor="clothing-size" className={styles.label}>
                Size
              </label>
              <input
                id="clothing-size"
                type="text"
                className={styles.input}
                placeholder="e.g. S, M, 32"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="clothing-color" className={styles.label}>
              Color
            </label>
            <input
              id="clothing-color"
              type="text"
              className={styles.input}
              placeholder="e.g. Burgundy, Navy, Cream"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!name.trim() || !image}
            >
              <Plus size={16} />
              <span>Add to Closet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
