import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ClosetTabs from "../../components/ClosetTabs/ClosetTabs";
import CategoryChips from "../../components/CategoryChips/CategoryChips";
import ClothingGrid from "../../components/ClothingGrid/ClothingGrid";
import type { ClothingItem } from "../../types/clothing";
import Shirt from "../../assets/images/shirt.png";
import Blazer from "../../assets/images/blazer.png";
import Loafers from "../../assets/images/loafers.png";
import Sweater from "../../assets/images/sweater.png";
import styles from "./Closet.module.css";
import EmptyState from "../../components/EmptyState/EmptyState";
import CollectionsView from "../../components/CollectionsView/CollectionsView";
import { DUMMY_COLLECTIONS } from "../../data/dummyCollections";
import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import { Plus } from "lucide-react";
import CreateCollectionModal from "../../components/CreateCollectionModal/CreateCollectionModal";
import type { Collection } from "../../types/collection";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import CollectionDetail from "../../components/CollectionDetail/CollectionDetail";
import AddClothingModal from "../../components/AddClothingModal/AddClothingModal";
import EditClothingModal from "../../components/EditClothingModal/EditClothingModal";

const DUMMY_CLOTHING: ClothingItem[] = [
  {
    id: "1",
    name: "White Shirt",
    image: Shirt,
    category: "Tops",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Black Blazer",
    image: Blazer,
    category: "Tops",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Loafers",
    image: Loafers,
    category: "Shoes",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Black Sweater",
    image: Sweater,
    category: "Tops",
    isFavorite: false,
  },
  {
    id: "5",
    name: "White Shirt",
    image: Shirt,
    category: "Tops",
    isFavorite: false,
  },
  {
    id: "6",
    name: "Black Blazer",
    image: Blazer,
    category: "Tops",
    isFavorite: true,
  },
  {
    id: "7",
    name: "Loafers",
    image: Loafers,
    category: "Shoes",
    isFavorite: false,
  },
  {
    id: "8",
    name: "Black Sweater",
    image: Sweater,
    category: "Tops",
    isFavorite: true,
  },
];

const CLOTHING_STORAGE_KEY = "outfity_clothing_v1";
const COLLECTION_STORAGE_KEY = "outfity_collections_v1";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const savedData = localStorage.getItem(key);

    if (savedData === null) {
      return fallback;
    }

    return JSON.parse(savedData) as T;
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return fallback;
  }
}

function Closet() {
  const [activeTab, setActiveTab] = useState<"clothes" | "collections">(
    "clothes",
  );
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  // const [clothingItems, setClothingItems] = useState(DUMMY_CLOTHING);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [isAddClothingOpen, setIsAddClothingOpen] = useState(false);
  const [clothingToEdit, setClothingToEdit] = useState<ClothingItem | null>(null);
  const [clothingToDelete, setClothingToDelete] = useState<string | null>(null);
  // const [collections, setCollections] = useState(DUMMY_COLLECTIONS);

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(() =>
  loadFromStorage(CLOTHING_STORAGE_KEY, DUMMY_CLOTHING),
);

const [collections, setCollections] = useState<Collection[]>(() =>
  loadFromStorage(COLLECTION_STORAGE_KEY, DUMMY_COLLECTIONS),
);
useEffect(() => {
  try {
    localStorage.setItem(
      CLOTHING_STORAGE_KEY,
      JSON.stringify(clothingItems),
    );
  } catch (error) {
    console.error("Failed to save clothing items:", error);
  }
}, [clothingItems]);

useEffect(() => {
  try {
    localStorage.setItem(
      COLLECTION_STORAGE_KEY,
      JSON.stringify(collections),
    );
  } catch (error) {
    console.error("Failed to save collections:", error);
  }
}, [collections]);

  const handleAddCollection = (name: string) => {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      coverImage: "",
      clothingIds: [],
    };
    setCollections((prevCollections) => [...prevCollections, newCollection]);
  };

  const handleAddClothing = (newItem: {
    name: string;
    image: string;
    category: string;
    size?: string;
    color?: string;
  }) => {
    const newClothing: ClothingItem = {
      ...newItem,
      id: crypto.randomUUID(),
      isFavorite: false,
    };
    setClothingItems((prevItems) => [newClothing, ...prevItems]);
  };

  const handleSaveEditedClothing = (updatedClothing: ClothingItem) => {
    setClothingItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedClothing.id ? updatedClothing : item
      )
    );
    setClothingToEdit(null);
  };

  const handleDeleteClothing = (id: string) => {
    setClothingToDelete(id);
  };

  const confirmDeleteClothing = () => {
    if (!clothingToDelete) return;

    setClothingItems((prevItems) =>
      prevItems.filter((item) => item.id !== clothingToDelete)
    );

    setCollections((prevCollections) =>
      prevCollections.map((collection) => ({
        ...collection,
        clothingIds: collection.clothingIds.filter(
          (id) => id !== clothingToDelete
        ),
      }))
    );

    setClothingToDelete(null);
  };

  const handleToggleFavorite = (id: string) => {
    setClothingItems((prevClothes) =>
      prevClothes.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    );
  };

  const filteredClothes = clothingItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "💖 Fav"
        ? item.isFavorite
        : item.category === activeCategory);

    const matchingSearch =
      searchValue === "" ||
      item.name.toLowerCase().includes(searchValue.toLowerCase());

    return matchesCategory && matchingSearch;
  });

  const handleCreateCollection = () => {
    setIsCreateModelOpen(true);
  };

  const [collectionToDelete, setCollectionToDelete] = useState<string | null>(
    null,
  );

  const handleDeleteCollection = (id: string) => {
    setCollectionToDelete(id);
  };

  const confirmDeleteCollection = () => {
    if (!collectionToDelete) return;

    setCollections((previousCollections) =>
      previousCollections.filter(
        (collection) => collection.id !== collectionToDelete,
      ),
    );

    setCollectionToDelete(null);
  };

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);
  const handleOpenCollection = (id: string) => {
    setSelectedCollectionId(id);
  };

  const selectedCollection = collections.find(
    (collection) => collection.id === selectedCollectionId,
  );

  const handleAddClothes = (clothingIdsToAdd: string[]) => {
    setCollections((previousCollections) =>
      previousCollections.map((collection) =>
        collection.id === selectedCollectionId
          ? {
              ...collection,
              clothingIds: [
                ...collection.clothingIds,
                ...clothingIdsToAdd,
              ],
            }
          : collection
      )
    );
  };

  const handleRemoveClothing = (clothingId: string) => {
    setCollections((previousCollections) =>
      previousCollections.map((collection) =>
        collection.id === selectedCollectionId
          ? {
              ...collection,
              clothingIds: collection.clothingIds.filter(
                (id) => id !== clothingId
              ),
            }
          : collection
      )
    );
  };

  return (
    <>
      {selectedCollection ? (
        <CollectionDetail
          collection={selectedCollection}
          clothes={clothingItems}
          onBack={() => setSelectedCollectionId(null)}
          onAddClothes={handleAddClothes}
          onRemoveClothing={handleRemoveClothing}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <div className={styles.closet}>
          <div className={styles.topRow}>
            <SearchBar
              value={searchValue}
              placeholder="Search your closet..."
              onChange={setSearchValue}
            />

            <ClosetTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {activeTab === "clothes" ? (
            <>
              <CategoryChips
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {clothingItems.length === 0 ? (
                <EmptyState
                  title="Your closet is empty"
                  description="Let's add your first piece to your closet."
                  action={
                    <button
                      type="button"
                      className={styles.emptyAddButton}
                      onClick={() => setIsAddClothingOpen(true)}
                    >
                      <Plus size={18} />
                      Add Clothes
                    </button>
                  }
                />
              ) : filteredClothes.length > 0 ? (
                <ClothingGrid
                  items={filteredClothes}
                  onToggleFavorite={handleToggleFavorite}
                  onEdit={(item) => setClothingToEdit(item)}
                  onDelete={handleDeleteClothing}
                />
              ) : (
                <EmptyState
                  title="No clothes found🤔"
                  description="Try another search or category."
                />
              )}
            </>
          ) : collections.length === 0 ? (
            <EmptyState
              title="No collections yet"
              description="Create your first collection to organize your wardrobe."
              action={
                <button
                  type="button"
                  className={styles.emptyAddButton}
                  onClick={handleCreateCollection}
                >
                  <Plus size={18} />
                  Add Collection
                </button>
              }
            />
          ) : (
            <CollectionsView
              items={collections}
              onCollectionClick={handleOpenCollection}
              onDelete={handleDeleteCollection}
            />
          )}

          {activeTab === "clothes" && (
            <FloatingActionButton
              icon={<Plus size={28} />}
              ariaLabel="Add Clothing"
              onClick={() => setIsAddClothingOpen(true)}
            />
          )}

          {activeTab === "collections" && (
            <FloatingActionButton
              icon={<Plus size={28} />}
              ariaLabel="Create Collection"
              onClick={handleCreateCollection}
            />
          )}

          {activeTab === "clothes" && (
            <AddClothingModal
              isOpen={isAddClothingOpen}
              onClose={() => setIsAddClothingOpen(false)}
              onAdd={handleAddClothing}
            />
          )}

          {activeTab === "collections" && (
            <CreateCollectionModal
              isOpen={isCreateModelOpen}
              onClose={() => setIsCreateModelOpen(false)}
              onCreate={handleAddCollection}
            />
          )}

          <EditClothingModal
            isOpen={clothingToEdit !== null}
            clothing={clothingToEdit}
            onClose={() => setClothingToEdit(null)}
            onSave={handleSaveEditedClothing}
          />
        </div>
      )}

      <ConfirmModal
        isOpen={collectionToDelete !== null}
        title="Delete Collection?"
        message="Are you sure you want to delete this collection?"
        confirmLabel="Delete"
        onClose={() => setCollectionToDelete(null)}
        onConfirm={confirmDeleteCollection}
      />

      <ConfirmModal
        isOpen={clothingToDelete !== null}
        title="Delete Clothing?"
        message="Are you sure you want to delete this clothing item? It will also be removed from any collections."
        confirmLabel="Delete"
        onClose={() => setClothingToDelete(null)}
        onConfirm={confirmDeleteClothing}
      />
    </>
  );
}

export default Closet;
