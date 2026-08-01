import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ClosetTabs from "../../components/ClosetTabs/ClosetTabs";
import styles from "./Closet.module.css";

function Closet() {
  const [activeTab, setActiveTab] = useState<"clothes" | "collections">(
    "clothes",
  );
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.topRow}>
      <SearchBar
        value={searchValue}
        placeholder="Search your closet..."
        onChange={setSearchValue}
      />
      <ClosetTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default Closet;
