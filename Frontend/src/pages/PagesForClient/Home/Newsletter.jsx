import React, { useState } from "react";
import { useInView } from "../../../hooks/useInView";
import { useTranslation } from "react-i18next";

export default function Newsletter() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ref, isInView] = useInView();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="newsletter" ref={ref}>
      <div
        className={`newsletter-container fade-in ${isInView ? "visible" : ""}`}
      >
        <span
          className="section-subtitle"
          style={{ color: "var(--color-gold-light)" }}
        >
          ✦ {t("newsletter.subtitle")}
        </span>

        <h2 className="newsletter-title">{t("newsletter.title")}</h2>

        <p className="newsletter-desc">{t("newsletter.description")}</p>

        {submitted ? (
          <div
            style={{
              color: "var(--color-gold-light)",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "14px 0",
            }}
          >
            ✦ {t("newsletter.success")}
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              {t("newsletter.button")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}