import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/images/final1.png";

function Sidebar({ isOpen, onMenuClick }) {
  return (
    <aside className={`sidebar-Admin ${isOpen ? "open" : ""}`}>
      {/* Top */}
      <div className="sidebar__top">
        {isOpen && (
          <button style={{ color: "white" }} onClick={onMenuClick}>
            ☰
          </button>
        )}

        <img
          style={{ width: "140px", height: "150px", margin: "auto" }}
          src={logo}
          alt=""
        />
      </div>

      {/* Navigation */}

      <nav className="sidebar__nav">
        <NavItem to="/admin/products" label="products" />
        <NavItem to="/admin/orders" label="Orders" />
      </nav>

      {/* Bottom */}
      <div className="sidebar__bottom">
        <button className="logout">Logout</button>
      </div>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink to={to} className="nav__item">
      {label}
    </NavLink>
  );
}

export default Sidebar;
