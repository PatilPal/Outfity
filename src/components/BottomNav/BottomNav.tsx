import { House, Shirt, User } from "lucide-react";
import styles from "./BottomNav.module.css";
import { NavLink } from "react-router-dom";
const navItems = [
  {
    id: "home",
    path: "/",
    icon: House,
  },
  {
    id: "closet",
    path: "/closet",
    icon: Shirt,
  },
  {
    id: "profile",
    path: "/profile",
    icon: User,
  },
];

function BottomNav() {
  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <NavLink 
            key={item.id} 
            to={item.path}
            className={ ({ isActive }) =>
                `${styles.navButton} ${isActive ? styles.active : ""}
            `}>
          <item.icon size={24} strokeWidth={2} />
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
