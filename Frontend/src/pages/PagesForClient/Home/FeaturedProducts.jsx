import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useInView } from "../../../hooks/useInView";

const products = [
  {
    id: 1,
    name: "Royal Oud Elixir",
    category: "Oud Collection",
    price: "1,050",
    rating: 5,
    reviews: 128,
    image: "/src/assets/images/product-1.jpg",
    badge: "Exclusive",
  },
  {
    id: 2,
    name: "Amber Noir Intense",
    category: "Oriental Collection",
    price: "720",
    rating: 5,
    reviews: 96,
    image: "/src/assets/images/product-2.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Golden Rose Absolute",
    category: "Floral Collection",
    price: "610",
    rating: 4,
    reviews: 73,
    image: "/src/assets/images/product-1.jpg",
    badge: null,
  },
  {
    id: 4,
    name: "Midnight Musk",
    category: "Musk Collection",
    price: "810",
    rating: 5,
    reviews: 145,
    image: "/src/assets/images/product-4.jpg",
    badge: "Best Seller",
  },
];

export default function FeaturedProducts() {
  const [ref, isInView] = useInView();
  const cardsRef = useRef(null);

  useEffect(() => {
    if (isInView && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".fade-in");
      cards.forEach((card) => card.classList.add("visible"));
    }
  }, [isInView]);

  return (
    <section className="section" id="featured" ref={ref}>
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
        <div className="products-grid" ref={cardsRef}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
