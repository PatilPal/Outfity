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

const DUMMY_CLOTHING: ClothingItem[] = [
  { id: "1", image: Shirt, category: "Shirt", isFavorite: true },
  { id: "2", image: Blazer, category: "Outerwear", isFavorite: false },
  { id: "3", image: Loafers, category: "Shoes", isFavorite: true },
  { id: "4", image: Sweater, category: "Knitwear", isFavorite: false },
  { id: "5", image: Shirt, category: "Shirt", isFavorite: false },
  { id: "6", image: Blazer, category: "Outerwear", isFavorite: true },
  { id: "7", image: Loafers, category: "Shoes", isFavorite: false },
  { id: "8", image: Sweater, category: "Knitwear", isFavorite: true },
];

function Closet() {
  const [activeTab, setActiveTab] = useState<"clothes" | "collections">(
    "clothes",
  );
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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
      <CategoryChips
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ClothingGrid items={DUMMY_CLOTHING} />
    </div>
  );
}

export default Closet;
