import React from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "../../../hooks/useInView";

export default function Banner() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView();

  return (
    <section className="banner" ref={ref}>
      <div className={`banner-container fade-in ${isInView ? "visible" : ""}`}>
        <div className="banner-content">
          <div className="banner-label">✦ {t("banner.label")}</div>

          <h2 className="banner-title">
            {t("banner.title.part1")}{" "}
            <span className="gold">{t("banner.title.highlight")}</span>
          </h2>

          <p className="banner-desc">{t("banner.description")}</p>

          <a href="#featured" className="banner-cta">
            {t("banner.cta")}
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

        <div className="banner-decoration">{t("banner.decoration")}</div>
      </div>
    </section>
  );
}