import React from "react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img
          src="/src/assets/images/hero-bg.jpg"
          alt="Luxury Arabian Perfume"
        />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">✦ Crafted in the Heart of Arabia</div>
        <h1 className="hero-title">
          Discover Your <span className="gold">Signature Scent</span>
        </h1>
        <p className="hero-desc">
          Immerse yourself in the art of Arabian perfumery. Each fragrance is a
          journey through rare oud, precious saffron, and timeless elegance —
          crafted for those who seek distinction.
        </p>
        <a href="#featured" className="hero-cta">
          Explore Collection
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
