import React from "react";
import { useTranslation } from "react-i18next";
import heroPG from "../../../assets/images/hero-bg.jpg";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img src={heroPG} alt="Luxury Arabian Perfume" loading="lazy" />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">✦ {t("hero.badge")}</div>

        <h1 className="hero-title">
          {t("hero.title.part1")}{" "}
          <span className="gold">{t("hero.title.highlight")}</span>
        </h1>

        <p className="hero-desc">{t("hero.description")}</p>

        <a href="#featured" className="hero-cta">
          {t("hero.cta")}
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
    </section>
  );
}