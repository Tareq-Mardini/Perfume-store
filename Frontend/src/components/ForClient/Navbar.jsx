import React, { useState, useEffect, useContext } from "react";
import { CartSidebar } from "./CartSidebar";
import { useCart } from "../../hooks/useCart";
export default function NavbarHome() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="/src/assets/images/final.png"
              className="logo"
              alt=""
            />
          </div>

          <div className="navbar-icons">
            <button
              className="icon-btn cart-btn"
              aria-label="Cart"
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
          </div>
        </div>
      </nav>
      <CartSidebar isOpen={cartOpen} setIsOpen={setCartOpen} />
    </>
  );
}
