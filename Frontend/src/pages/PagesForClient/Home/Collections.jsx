import React, { useEffect, useRef } from "react";
import { useInView } from "../../../hooks/useInView";

const collections = [
  { id: 1, name: "Oud", count: 24, icon: "🪵", className: "collection-oud" },
  { id: 2, name: "Musk", count: 18, icon: "🌙", className: "collection-musk" },
  {
    id: 3,
    name: "Floral",
    count: 21,
    icon: "🌹",
    className: "collection-floral",
  },
  {
    id: 4,
    name: "Oriental",
    count: 16,
    icon: "✨",
    className: "collection-oriental",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Collections() {
  const [ref, isInView] = useInView();
  const gridRef = useRef(null);

  useEffect(() => {
    if (isInView && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".fade-in");
      cards.forEach((card) => card.classList.add("visible"));
    }
  }, [isInView]);

  return (
    <section
      className="section"
      id="collections"
      style={{ background: "var(--color-beige-light)" }}
      ref={ref}
    >
      <div className="container">
        <div className={`section-header fade-in ${isInView ? "visible" : ""}`}>
          <span className="section-subtitle">✦ Browse by Category</span>
          <h2 className="section-title">Our Collections</h2>
          <div className="section-divider" />
          <p className="section-desc">
            Explore our thoughtfully curated families of fragrance, each
            inspired by a distinct facet of Arabian heritage.
          </p>
        </div>
        <div className="collections-grid" ref={gridRef}>
          {collections.map((col, i) => (
            <div
              key={col.id}
              className={`collection-card ${col.className} fade-in fade-in-delay-${i + 1}`}
            >
              <div className="collection-card-bg" />
              <div className="collection-card-content">
                <div className="collection-icon">{col.icon}</div>
                <h3 className="collection-name">{col.name}</h3>
                <span className="collection-count">{col.count} Fragrances</span>
              </div>
              <div className="collection-arrow">
                <ArrowIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
