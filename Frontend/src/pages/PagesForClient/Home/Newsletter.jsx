import React, { useState } from "react";
import { useInView } from "../../../hooks/useInView";

export default function Newsletter() {
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
          ✦ Stay Connected
        </span>
        <h2 className="newsletter-title">Join the Inner Circle</h2>
        <p className="newsletter-desc">
          Be the first to discover new collections, exclusive launches, and
          private events. Receive curated scent stories delivered to your inbox.
        </p>
        {submitted ? (
          <div
            style={{
              color: "var(--color-gold-light)",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "14px 0",
            }}
          >
            ✦ Welcome to the circle. Thank you for subscribing.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
