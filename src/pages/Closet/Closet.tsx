import { useState } from "react";
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

function Closet() {
  const [activeTab, setActiveTab] = useState<"clothes" | "collections">(
    "clothes",
  );
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [clothingItems, setClothingItems] = useState(DUMMY_CLOTHING);
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [collections, setCollections] = useState(DUMMY_COLLECTIONS);
  const handleAddCollection = (name: string) => {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      coverImage: "",
      clothesCount: 0,
    };
    setCollections((prevCollections) => [...prevCollections, newCollection]);
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

  return (
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
          {filteredClothes.length > 0 ? (
            <ClothingGrid
              items={filteredClothes}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <EmptyState />
          )}
        </>
      ) : (
        <CollectionsView
          items={collections}
          onDelete={handleDeleteCollection}
        />
      )}
      {activeTab === "collections" && (
        <FloatingActionButton
          icon={<Plus size={28} />}
          ariaLabel="Create Collection"
          onClick={handleCreateCollection}
        />
      )}
      {activeTab === "collections" && (
        <CreateCollectionModal
          isOpen={isCreateModelOpen}
          onClose={() => setIsCreateModelOpen(false)}
          onCreate={handleAddCollection}
        />
      )}

      <ConfirmModal
        isOpen={collectionToDelete !== null}
        onClose={() => setCollectionToDelete(null)}
        onConfirm={confirmDeleteCollection}
      />
    </div>
  );
}

export default Closet;
