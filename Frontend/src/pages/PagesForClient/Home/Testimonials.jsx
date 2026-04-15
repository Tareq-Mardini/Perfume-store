import React, { useEffect, useRef } from "react";
import { useInView } from "../../../hooks/useInView";

const testimonials = [
  {
    id: 1,
    name: "Fatima Al-Hashemi",
    location: "Dubai, UAE",
    initials: "FA",
    rating: 5,
    text: "The Royal Oud Elixir is unlike anything I have ever worn. It lingers beautifully for hours and always draws compliments. Truly a masterpiece of Arabian perfumery.",
  },
  {
    id: 2,
    name: "Khalid Al-Mansoori",
    location: "Abu Dhabi, UAE",
    initials: "KM",
    rating: 5,
    text: "I have been a loyal customer for five years now. The quality and craftsmanship are unmatched. Every fragrance tells a story, and the packaging is absolutely exquisite.",
  },
  {
    id: 3,
    name: "Noura Al-Suwaidi",
    location: "Sharjah, UAE",
    initials: "NS",
    rating: 5,
    text: "From the moment I received my first order, I knew this was special. The attention to detail, from scent to presentation, reflects true luxury. A brand worthy of its heritage.",
  },
];

export default function Testimonials() {
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
      className="section"
      ref={ref}
    >
      <div className="container">
        <div className={`section-header fade-in ${isInView ? "visible" : ""}`}>
          <span className="section-subtitle">✦ Voices of Distinction</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="section-divider" />
        </div>
        <div className="testimonials-grid" ref={gridRef}>
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testimonial-card fade-in fade-in-delay-${i + 1}`}
            >
              <div className="testimonial-quote-icon">"</div>
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-location">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
