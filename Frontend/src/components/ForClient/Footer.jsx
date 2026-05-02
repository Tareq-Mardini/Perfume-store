import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import footer from "../../assets/images/final.png";

import {
  FaInstagram,
  FaSnapchatGhost,
  FaFacebookF,
  FaTiktok
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";


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
              <a
                href="https://www.instagram.com/munaryss.perfumes?igsh=Z3JiYW5vdHVwOXRs"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.snapchat.com/add/munaryssperfums?share_id=eLTjZpGVhqM&locale=ar-AE"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaSnapchatGhost />
              </a>

              <a
                href="https://share.upscrolled.com/ar/user/f1502030-0693-4ddd-8cf4-09ef3136abf3/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FiLink />
              </a>

              <a
                href="https://www.facebook.com/share/1DxSd4ATQH/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.tiktok.com/@munaryss.perfumes?_r=1&_t=ZS-95xUG8v3IHs"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaTiktok />
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
              <span dir="ltr">{t("footer.phone")}</span>
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