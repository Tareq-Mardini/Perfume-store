// Header.jsx
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { useLanguage } from "../../../Context/LanguageContext";
import { Earth } from "lucide-react";

function Header({ onMenuClick }) {
  const [langOpen, setLangOpen] = useState(false);
  const { changeLanguage, language } = useLanguage();

  useEffect(() => {
    if (langOpen) {
      setLangOpen(!langOpen);
    }
  }, [language]);
  return (
    <header className={styles.header}>
      {/* Left */}
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          ☰
        </button>
        <div className="lang-switcher">
          <button className="icon-btn" onClick={() => setLangOpen(!langOpen)}>
            <Earth size={20} strokeWidth={1.5} />
          </button>

          {langOpen && (
            <div className={styles.langDropdown}>
              <div onClick={() => changeLanguage("ar")}>العربية</div>

              <div onClick={() => changeLanguage("en")}> English</div>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className={styles.right}></div>
    </header>
  );
}

export default Header;
