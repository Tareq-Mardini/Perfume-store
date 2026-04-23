import React from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "../../../hooks/useInView";

export default function BrandStory() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView();

  return (
    <section
      style={{ paddingBottom: "20px" }}
      className="section story"
      id="story"
      ref={ref}
    >
      <div className="story-container">
        <div className={`story-image fade-in ${isInView ? "visible" : ""}`}>
          <img
            src="/src/assets/images/story.jpg"
            alt={t("story.imageAlt")}
            loading="lazy"
          />

          <div className="story-image-badge">
            <div className="number">25+</div>
            <div className="label">{t("story.badge")}</div>
          </div>
        </div>

        <div
          className={`story-content fade-in fade-in-delay-2 ${isInView ? "visible" : ""}`}
        >
          <div className="story-label">✦ {t("story.label")}</div>

          <h2 className="story-title">{t("story.title")}</h2>

          <p className="story-text">{t("story.p1")}</p>

          <p className="story-text">{t("story.p2")}</p>

          <p className="story-text">{t("story.p3")}</p>

          <div className="story-signature">
            <div className="story-signature-line" />
            <span className="story-signature-text">{t("story.signature")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}