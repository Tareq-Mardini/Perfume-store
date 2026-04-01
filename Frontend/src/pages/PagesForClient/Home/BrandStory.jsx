import React from "react";
import { useInView } from "../../../hooks/useInView";

export default function BrandStory() {
  const [ref, isInView] = useInView();

  return (
    <section className="section story" id="story" ref={ref}>
      <div className="story-container">
        <div className={`story-image fade-in ${isInView ? "visible" : ""}`}>
          <img
            src="/src/assets/images/story.jpg"
            alt="Arabian Perfumery Craftsmanship"
            loading="lazy"
          />
          <div className="story-image-badge">
            <div className="number">25+</div>
            <div className="label">Years of Craft</div>
          </div>
        </div>

        <div
          className={`story-content fade-in fade-in-delay-2 ${isInView ? "visible" : ""}`}
        >
          <div className="story-label">✦ Our Heritage</div>
          <h2 className="story-title">A Legacy Woven in Scent</h2>
          <p className="story-text">
            For over two decades, Dār Al-Ūd has stood at the crossroads of
            tradition and innovation. Born in the aromatic souks of the Arabian
            Gulf, our house draws upon centuries of perfumery wisdom passed down
            through generations of master blenders.
          </p>
          <p className="story-text">
            Each fragrance begins as a vision — a memory of dew-kissed rose
            gardens, the warmth of aged oud wood, the quiet power of rare Yemeni
            frankincense. Our perfumers travel the ancient spice routes,
            hand-selecting the world's most precious ingredients to compose
            scents that transcend time.
          </p>
          <p className="story-text">
            We believe a fragrance is more than a scent — it is an identity, a
            signature, a story told without words. Every bottle we craft is an
            invitation to discover the extraordinary within the everyday.
          </p>
          <div className="story-signature">
            <div className="story-signature-line" />
            <span className="story-signature-text">
              — The House of Dār Al-Ūd
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
