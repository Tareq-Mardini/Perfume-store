// Sidebar.jsx
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../../assets/images/final1.png";

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* Top */}
      <div className={styles.top}>
        {/* زر الإغلاق – يظهر بالموبايل فقط عبر CSS */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <img className={styles.logo} src={logo} alt="Logo" />
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <NavItem to="/admin/products" label="Products" />
        <NavItem to="/admin/orders" label="Orders" />
      </nav>

      {/* Bottom */}
      <div className={styles.bottom}>
        <button className={styles.logout}>Logout</button>
      </div>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.active : ""}`
      }
    >
      {label}
    </NavLink>
  );
}

export default Sidebar;
