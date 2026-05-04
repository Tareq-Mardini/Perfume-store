// Sidebar.jsx
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../../assets/images/final1.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login-admin");
  };
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
        <NavItem to="/admin/products" label={t("adminProducts.highlight")} />
        <NavItem to="/admin/orders" label={t("adminOrders.name")} />
      </nav>

      {/* Bottom */}
      <div className={styles.bottom}>
        <button className={styles.logout} onClick={handleLogout}>
          {t("logout")}
        </button>
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
