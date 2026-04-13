import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { useEffect } from "react";
import "./AboutUs.css";
import { Target, Eye, ShieldCheck, Gem, Truck, CreditCard } from "lucide-react";
export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      <section class="page-section" id="page-about">
        <div class="page-header">
          <div class="section-label">Our Heritage</div>
          <h1>About Oudh Royale</h1>
          <p>
            A legacy of fragrance, born from the rich traditions of Emirati
            perfumery
          </p>
        </div>
        <div class="container-About" style={{ marginTop: "-60px" }}>
          <div class="about-story">
            <div class="about-story-visual">
              <div class="perfume-art">
                <svg viewBox="0 0 120 200" fill="none">
                  <rect
                    x="35"
                    y="20"
                    width="50"
                    height="8"
                    rx="2"
                    fill="#C6A25A"
                    opacity="0.6"
                  />
                  <rect
                    x="50"
                    y="4"
                    width="20"
                    height="20"
                    rx="3"
                    fill="#C6A25A"
                    opacity="0.4"
                  />
                  <rect
                    x="56"
                    y="0"
                    width="8"
                    height="8"
                    rx="2"
                    fill="#C6A25A"
                    opacity="0.7"
                  />
                  <path
                    d="M30 28H90V40C90 40 85 50 85 70V160C85 172 75 180 60 180C45 180 35 172 35 160V70C35 50 30 40 30 40V28Z"
                    fill="#1C1F1E"
                    stroke="#C6A25A"
                  />
                  <ellipse
                    cx="60"
                    cy="192"
                    rx="30"
                    ry="5"
                    fill="#C6A25A"
                    opacity="0.1"
                  />
                  <image
                    href="/src/assets/images/final1.png"
                    x="30"
                    y="40"
                    width="60"
                    height="100"
                  />
                </svg>
                <p>Signature Collection</p>
              </div>
            </div>

            <div class="about-story-text">
              <div class="section-label">Our Story</div>
              <h2>
                A Heritage of <span>Arabian Luxury</span>
              </h2>
              <div class="gold-divider"></div>

              <p>
                Founded in the vibrant heart of the United Arab Emirates, Oudh
                Royale was born from a deep passion for Arabian perfumery
                traditions. Our mission is to bring timeless oud fragrances into
                the modern world.
              </p>

              <p>
                We carefully select premium ingredients including rare oud,
                sandalwood, and floral extracts. Every fragrance is crafted with
                precision by expert perfumers.
              </p>

              <p>
                Today, Oudh Royale represents elegance, authenticity, and
                luxury, serving customers across the UAE with pride.
              </p>
            </div>
          </div>

          <div className="mission-vision">
            <div className="mv-card">
              <div className="icon-wrap">
                <Target size={28} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To deliver high-quality luxury fragrances while preserving the
                rich heritage of Arabian perfumery and providing an exceptional
                customer experience.
              </p>
            </div>

            <div className="mv-card">
              <div className="icon-wrap">
                <Eye size={28} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To become a leading luxury fragrance brand known for
                authenticity, craftsmanship, and timeless elegance.
              </p>
            </div>
          </div>

          <div className="why-choose">
            <h2>
              Why Choose <span>Oudh Royale</span>
            </h2>

            <div className="why-grid">
              <div className="why-card">
                <div className="icon-circle">
                  <ShieldCheck size={26} />
                </div>
                <h4>Certified Authentic</h4>
                <p>100% original fragrances from trusted sources.</p>
              </div>

              <div className="why-card">
                <div className="icon-circle">
                  <Gem size={26} />
                </div>
                <h4>Premium Quality</h4>
                <p>Only the finest ingredients are used.</p>
              </div>

              <div className="why-card">
                <div className="icon-circle">
                  <Truck size={26} />
                </div>
                <h4>Fast Delivery</h4>
                <p>Quick shipping across the UAE.</p>
              </div>

              <div className="why-card">
                <div className="icon-circle">
                  <CreditCard size={26} />
                </div>
                <h4>Cash on Delivery</h4>
                <p>Pay easily upon receiving your order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
