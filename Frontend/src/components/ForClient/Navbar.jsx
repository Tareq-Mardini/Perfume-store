import React, { useState, useEffect } from "react";
import { CartSidebar } from "./CartSidebar";
import { useCart } from "../../hooks/useCart";
import { NavLink } from "react-router-dom";

export default function NavbarHome() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع السكرول لما المينيو مفتوح
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const links = [
    { name: "Home", type: "route", path: "/" },
    { name: "Shops", type: "route", path: "/products" },
    { name: "About Us", type: "route", path: "/about" },
    { name: "Terms", type: "route", path: "/terms" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <img src="/src/assets/images/final.png" className="logo" alt="" />
          </div>

          {/* Desktop Links */}
          <div
            className="navbar-links desktop-only"
            style={{ marginRight: "66px" }}
          >
            {links.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {link.name}
                </NavLink>
              ) : (
                <button
                  className="nav-link"
                  onClick={() => handleScrollTo("footer")}
                >
                  Contact
                </button>
              ),
            )}
          </div>

          {/* Icons */}
          <div className="navbar-icons">
            <button
              className="icon-btn cart-btn"
              onClick={() => setCartOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="cart-count">{items.length}</span>
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {links.map((link) =>
            link.type === "route" ? (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ) : (
              <button
                style={{ fontSize: "1.2rem" }}
                className="nav-link"
                key={link.name}
                onClick={() => {
                  handleScrollTo(link.target);
                  setMenuOpen(false);
                }}
              >
                {link.name}
              </button>
            ),
          )}
        </div>
      </nav>

      <CartSidebar isOpen={cartOpen} setIsOpen={setCartOpen} />
    </>
  );
}
