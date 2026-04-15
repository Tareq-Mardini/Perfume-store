import React from "react";
import ProductCard from "./ProductCard";
import { useInView } from "../../../hooks/useInView";

const products = [
  {
    id: 1,
    name: "Royal Oud Elixir",
    category: "Oud Collection",
    price: 1050,
    rating: 5,
    reviews: 128,
    image: "/src/assets/images/product-1.jpg",
    badge: "Exclusive",
  },
  {
    id: 2,
    name: "Amber Noir Intense",
    category: "Oriental Collection",
    price: 720,
    rating: 5,
    reviews: 96,
    image: "/src/assets/images/product-2.jpg",
    badge: "New",
  },

  // ✅ Coming Soon - Incense
  {
    id: 3,
    name: "Golden Bakhoor",
    category: "Bakhoor Collection",
    price: 0,
    rating: 0,
    reviews: 0,
    image: "/src/assets/images/product-1.jpg",
    badge: null,
    isComingSoon: true,
    comingSoonLabel: "Bakhoor",
  },

  // ✅ Coming Soon - Beads
  {
    id: 4,
    name: "Luxury Tasbih",
    category: "Tasbih Collection",
    price: 0,
    rating: 0,
    reviews: 0,
    image: "/src/assets/images/product-4.jpg",
    badge: null,
    isComingSoon: true,
    comingSoonLabel: "Prayer Beads",
  },
];

export default function FeaturedProducts() {
  const [ref, isInView] = useInView();

  return (
    <section
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
      className="section"
      id="featured"
      ref={ref}
    >
      <div className="container">
        <div className={`section-header fade-in ${isInView ? "visible" : ""}`}>
          <span className="section-subtitle">✦ Curated for You</span>
          <h2 className="section-title">Featured Fragrances</h2>
          <div className="section-divider" />
          <p className="section-desc">
            Hand-selected masterpieces from our atelier, each bottle a testament
            to the art of Arabian perfumery.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              delay={i + 1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}