import styles from "./CategoryChips.module.css";

const categories = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Shoes",
  "Accessories",
];

type CategoryChipsProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

function CategoryChips({ activeCategory, onCategoryChange }: CategoryChipsProps) {
  return (
    <div className={styles.categoryChips}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.categoryButton} ${
            activeCategory === category ? styles.active : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
