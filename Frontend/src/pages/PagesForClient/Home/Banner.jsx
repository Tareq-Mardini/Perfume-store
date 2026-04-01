import React from "react";
import { useInView } from "../../../hooks/useInView";

export default function Banner() {
  const [ref, isInView] = useInView();

  return (
    <section className="banner" ref={ref}>
      <div className={`banner-container fade-in ${isInView ? "visible" : ""}`}>
        <div className="banner-content">
          <div className="banner-label">✦ Limited Edition</div>
          <h2 className="banner-title">
            The Art of <span className="gold">Oud</span> — Reimagined
          </h2>
          <p className="banner-desc">
            Experience our master perfumer's latest creation — a rare blend of
            Cambodian oud, Indian saffron, and Turkish rose. Only 500 bottles
            crafted worldwide.
          </p>
          <a href="#featured" className="banner-cta">
            Discover Now
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
        <div className="banner-decoration">Oud</div>
      </div>
    </section>
  );
}
