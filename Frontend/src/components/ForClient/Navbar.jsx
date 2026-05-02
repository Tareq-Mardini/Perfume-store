import React, { useState, useEffect } from "react";
import { CartSidebar } from "./CartSidebar";
import { useCart } from "../../hooks/useCart";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/final.png";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "../../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import { Earth } from "lucide-react";

export default function NavbarHome() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const [langOpen, setLangOpen] = useState(false);
  const { changeLanguage, language } = useLanguage();
  const { t } = useTranslation();
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

  useEffect(() => {
    if (langOpen) {
      setLangOpen(!langOpen);
    }
  }, [language]);

  // منع السكرول لما المينيو مفتوح
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const links = [
    { name: t("navbar.home"), type: "route", path: "/" },
    { name: t("navbar.shops"), type: "route", path: "/products" },
    { name: t("navbar.about"), type: "route", path: "/about" },
    { name: t("navbar.terms"), type: "route", path: "/terms" },
  ];
  

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} className="logo" alt="logo" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div
            className="navbar-links desktop-only"
            style={{
              marginRight: language === "en" ? "130px" : "0px",
              marginLeft: language === "ar" ? "130px" : "0px",
            }}
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
            <div className="lang-switcher">
              <button
                className="icon-btn"
                onClick={() => setLangOpen(!langOpen)}
              >
                <Earth size={20} strokeWidth={1.5} />
              </button>

              {langOpen && (
                <div className="lang-dropdown">
                  <div onClick={() => changeLanguage("ar")}>العربية</div>

                  <div onClick={() => changeLanguage("en")}> English</div>
                </div>
              )}
            </div>
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
