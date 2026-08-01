import styles from "./ClosetTabs.module.css";

type ClosetTabsProps = {
  activeTab: "clothes" | "collections";
  onTabChange: (tab: "clothes" | "collections") => void;
};

const tabs = [
  { id: "clothes", label: "CLOTHES" },
  { id: "collections", label: "COLLECTIONS" },
] as const;

export default function ClosetTabs({
  activeTab,
  onTabChange,
}: ClosetTabsProps) {
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div className={styles.tabs}>
      <div
        className={styles.indicator}
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
          width: `${100 / tabs.length}%`,
        }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.button} ${activeTab === tab.id ? styles.active : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
