import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <Search className={styles.icon}/>
      <input placeholder={placeholder} value={value} className={styles.searchBox} onChange={(e) => onChange(e.target.value)}></input>
      
    </div>
  );
}

export default SearchBar;
