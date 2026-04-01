import React from "react";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <img
              src="/public/images/gemini-3.1-flash-image-preview (nano-banana-2)_a_بدي_تحول_اللوغو_كلو_.png"
              class="logo"
              alt=""
            />
            <p className="footer-about">
              A house of rare fragrances rooted in Arabian heritage. We craft
              scents that celebrate identity, elegance, and the timeless art of
              perfumery.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                <TiktokIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#collections">Collections</a>
              </li>
              <li>
                <a href="#best-sellers">Best Sellers</a>
              </li>
              <li>
                <a href="#story">Our Story</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#">Returns & Exchange</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Size Guide</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-col-title">Get in Touch</h4>
            <div className="footer-contact-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                The Dubai Mall, Fashion Avenue
                <br />
                Dubai, UAE
              </span>
            </div>
            <div className="footer-contact-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>+971 4 123 4567</span>
            </div>
            <div className="footer-contact-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>hello@daralud.ae</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Dār Al-Ūd. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
