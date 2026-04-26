import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import footer from "../../assets/images/final.png";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img src={footer} className="logo" alt="" />

            <p className="footer-about">{t("footer.about")}</p>

            <div className="footer-socials">
              <a href="#" className="social-link">
                <InstagramIcon />
              </a>
              <a href="#" className="social-link">
                <TwitterIcon />
              </a>
              <a href="#" className="social-link">
                <FacebookIcon />
              </a>
              <a href="#" className="social-link">
                <TiktokIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">{t("footer.quickLinks")}</h4>

            <ul className="footer-links">
              <li>
                <Link to="/">{t("footer.home")}</Link>
              </li>
              <li>
                <Link to="/products">{t("footer.shops")}</Link>
              </li>
              <li>
                <Link to="/about">{t("footer.aboutUs")}</Link>
              </li>
              <li>
                <Link to="/terms">{t("footer.terms")}</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-col-title">{t("footer.contactTitle")}</h4>

            <div className="footer-contact-item">
              <span>{t("footer.address")}</span>
            </div>

            <div className="footer-contact-item">
              <span>{t("footer.phone")}</span>
            </div>

            <div className="footer-contact-item">
              <span>{t("footer.email")}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>{t("footer.rights")}</span>

          <div className="footer-bottom-links">
            <Link to="/terms">{t("footer.termsOfService")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}