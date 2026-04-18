import "./Header.css";

function Header({ onMenuClick }) {
  return (
    <header className="header">
      {/* Left */}
      <div className="header__left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
      </div>

      {/* Right */}
      <div className="header__right"></div>
    </header>
  );
}

export default Header;
