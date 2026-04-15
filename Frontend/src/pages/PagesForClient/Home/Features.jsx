import React, { useEffect, useRef } from "react";
import { useInView } from "../../../hooks/useInView";

const features = [
  {
    id: 1,
    title: "Free UAE Delivery",
    desc: "Complimentary shipping on all orders within the Emirates",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Premium Quality",
    desc: "Ethically sourced rare ingredients from around the world",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Expert Guidance",
    desc: "Personalized fragrance consultation from our specialists",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Luxury Gift Wrapping",
    desc: "Exquisite presentation with every purchase, complimentary",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
];

export default function Features() {
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
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
      className="section features"
      ref={ref}
    >
      <div className="container">
        <div className="features-grid" ref={gridRef}>
          {features.map((f, i) => (
            <div
              key={f.id}
              className={`feature-card fade-in fade-in-delay-${i + 1}`}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
