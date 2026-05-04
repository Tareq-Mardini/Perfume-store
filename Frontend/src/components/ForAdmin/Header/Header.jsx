// Header.jsx
import styles from "./Header.module.css";

function Header({ onMenuClick }) {
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
      </div>

      {/* Right */}
      <div className={styles.right}></div>
    </header>
  );
}

export default Header;
