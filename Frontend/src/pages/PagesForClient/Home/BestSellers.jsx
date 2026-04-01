import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useInView } from "../../../hooks/useInView";

const products = [
  {
    id: 5,
    name: "Sultan's Reserve",
    category: "Oud Collection",
    price: "1,290",
    rating: 5,
    reviews: 204,
    image: "/src/assets/images/product-1.jpg",
    badge: "Limited",
  },
  {
    id: 6,
    name: "Velvet Amber",
    category: "Oriental Collection",
    price: "980",
    rating: 5,
    reviews: 167,
    image: "/src/assets/images/product-3.jpg",
    badge: "Best Seller",
  },
  {
    id: 7,
    name: "Desert Saffron",
    category: "Spice Collection",
    price: "890",
    rating: 4,
    reviews: 89,
    image: "/src/assets/images/product-2.jpg",
    badge: null,
  },
  {
    id: 8,
    name: "Pearl Jasmine",
    category: "Floral Collection",
    price: "680",
    rating: 5,
    reviews: 132,
    image: "/src/assets/images/product-4.jpg",
    badge: "New",
  },
];

export default function BestSellers() {
  const [ref, isInView] = useInView();
  const cardsRef = useRef(null);

  useEffect(() => {
    if (isInView && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".fade-in");
      cards.forEach((card) => card.classList.add("visible"));
    }
  }, [isInView]);

  return (
    <section className="section" id="best-sellers" ref={ref}>
      <div className="container">
        <div className={`section-header fade-in ${isInView ? "visible" : ""}`}>
          <span className="section-subtitle">✦ Most Loved</span>
          <h2 className="section-title">Best Sellers</h2>
          <div className="section-divider" />
          <p className="section-desc">
            The fragrances our discerning clientele return to, time and again.
            Timeless compositions that define modern Arabian luxury.
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
