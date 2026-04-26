import React from "react";
import { useTranslation } from "react-i18next";
const badgeClassMap = {
  Exclusive: "badge-exclusive",
  New: "badge-new",
  "Best Seller": "badge-bestseller",
  Limited: "badge-limited",
};

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ opacity: i <= rating ? 1 : 0.3 }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product, delay = 0, isInView }) {
  const { t } = useTranslation();
  return (
    <div
      className={`product-card fade-in fade-in-delay-${delay} ${
        isInView ? "visible" : ""
      } ${product.isComingSoon ? "cs-card-disabled" : ""}`}
    >
      {/* ✅ Overlay على كامل الكارد */}
      {product.isComingSoon && (
        <div className="cs-full-overlay">
          <div className="cs-full-blur" />
          <div className="cs-full-content">
            <span className="cs-full-title">
              {t("featuredComming.comingSoon")}
            </span>
            <span className="cs-full-sub">{product.comingSoonLabel}</span>
          </div>
        </div>
      )}

      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />

        {!product.isComingSoon && product.badge && (
          <span
            className={`product-badge ${
              badgeClassMap[product.badge] || "badge-new"
            }`}
          >
            {product.badge}
          </span>
        )}

        {!product.isComingSoon && (
          <div className="product-card-overlay">
            <button className="add-to-cart-btn">
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
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div className="product-card-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>

        {!product.isComingSoon && (
          <>
            <div className="product-rating">
              <StarRating rating={product.rating} />
              <span className="rating-count">({product.reviews})</span>
            </div>

            <div className="product-price">
              <span className="currency">AED</span>
              {product.price}
            </div>
          </>
        )}
      </div>
    </div>
  );
}