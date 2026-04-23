import React, { useEffect, useRef } from "react";
import { useInView } from "../../../hooks/useInView";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView();
  const gridRef = useRef(null);

  const testimonials = t("testimonials.items", { returnObjects: true });

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
          <span className="section-subtitle">
            ✦ {t("testimonials.subtitle")}
          </span>

          <h2 className="section-title">{t("testimonials.title")}</h2>

          <div className="section-divider" />
        </div>

        <div className="testimonials-grid" ref={gridRef}>
          {testimonials.map((tItem, i) => (
            <div
              key={tItem.id}
              className={`testimonial-card fade-in fade-in-delay-${i + 1}`}
            >
              <div className="testimonial-quote-icon">"</div>

              <div className="testimonial-stars">
                {[...Array(tItem.rating)].map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>

              <p className="testimonial-text">{tItem.text}</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">{tItem.initials}</div>

                <div>
                  <div className="testimonial-name">{tItem.name}</div>

                  <div className="testimonial-location">{tItem.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}