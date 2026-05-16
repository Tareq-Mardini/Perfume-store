import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "../../../hooks/useInView";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import { FaEye } from "react-icons/fa";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const productsRef = useRef([]);

  const { t } = useTranslation();
  const [ref, isInView] = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getCategoryName = (category) => {
    if (language === "ar") {
      if (category === "unisex") return "رجالي ونسائي";
      if (category === "men") return "رجالي";
      if (category === "women") return "نسائي";
    }
    return category;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/products/?page_size=6");
      setProducts(response.data.results);
      productsRef.current = response.data.results;
    } catch (error) {
      setProducts([]);
      console.error("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [language]);

  const goToRef = useRef(null); // ref للـ goTo عشان الأوتوبلاي يستخدمه

  // ✅ startAutoplay يستخدم goToRef عشان الأنيميشن تشتغل تلقائياً
  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    if (productsRef.current.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      if (goToRef.current) {
        goToRef.current(
          (prev) => (prev + 1) % productsRef.current.length,
          "next",
        );
      }
    }, 3500);
  }, []);

  useEffect(() => {
    if (products.length > 1) {
      productsRef.current = products;
      startAutoplay();
    }
    return () => clearInterval(autoplayRef.current);
  }, [products, startAutoplay]);

  const goTo = useCallback(
    (indexOrFn, dir = "next") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrent((prev) => {
        const next =
          typeof indexOrFn === "function" ? indexOrFn(prev) : indexOrFn;
        return next;
      });
      setTimeout(() => setIsAnimating(false), 650);
    },
    [isAnimating],
  );

  // ✅ نحدّث الـ ref دايماً لآخر نسخة من goTo
  goToRef.current = goTo;

  // ✅ تنقل يدوي يعيد الأوتوبلاي من الصفر
  const manualGoTo = useCallback(
    (indexOrFn, dir = "next") => {
      goTo(indexOrFn, dir);
      startAutoplay();
    },
    [goTo, startAutoplay],
  );

  // Drag / Swipe
  const onDragStart = (e) => {
    clearInterval(autoplayRef.current);
    setIsDragging(true);
    setDragStart(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
    setDragDelta(0);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    setDragDelta(x - dragStart);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const len = productsRef.current.length;
    if (dragDelta < -60) manualGoTo((prev) => (prev + 1) % len, "next");
    else if (dragDelta > 60)
      manualGoTo((prev) => (prev - 1 + len) % len, "prev");
    else startAutoplay();
    setDragDelta(0);
  };

  const visibleCards = () => {
    if (products.length === 0) return [];
    const count = products.length;
    const prev = (current - 1 + count) % count;
    const next = (current + 1) % count;
    return [
      { index: prev, position: "prev" },
      { index: current, position: "active" },
      { index: next, position: "next" },
    ];
  };

  return (
    <section
      className="section"
      id="featured"
      ref={ref}
      style={{ paddingTop: "60px", paddingBottom: "70px", overflow: "hidden" }}
    >
      <style>{`
        @keyframes slideInNext {
          0%   { opacity: 0; transform: translateX(calc(-50% + 80px)) scale(0.93); filter: blur(4px); }
          60%  { filter: blur(0px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); filter: blur(0px); }
        }
        @keyframes slideInPrev {
          0%   { opacity: 0; transform: translateX(calc(-50% - 80px)) scale(0.93); filter: blur(4px); }
          60%  { filter: blur(0px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); filter: blur(0px); }
        }
        @keyframes sideFloat {
          0%   { opacity: 0; transform: translateX(calc(-50% - 380px)) scale(0.85); }
          100% { opacity: 0.55; transform: translateX(calc(-50% - 380px)) scale(0.88); }
        }
        .card-enter-next {
          animation: slideInNext 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .card-enter-prev {
          animation: slideInPrev 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .view-details-btn:hover {
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow: 0 10px 25px rgba(30,58,41,0.25) !important;
        }
        .view-details-btn:active {
          transform: scale(0.97) !important;
        }
      `}</style>
      <div style={{ padding: "0px" }} className="container">
        {/* HEADER */}
        <div className={`section-header fade-in ${isInView ? "visible" : ""}`}>
          <span className="section-subtitle">✦ {t("featured.subtitle")}</span>
          <h2 className="section-title">{t("featured.title")}</h2>
          <div className="section-divider" />
          <p className="section-desc">{t("featured.desc")}</p>
        </div>
      </div>

      {/* SLIDER */}
      {loading ? (
        <div style={loaderWrap}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ ...skeletonCard, opacity: 1 - i * 0.3 }} />
          ))}
        </div>
      ) : (
        <div
          style={sliderWrap}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          <div style={stageStyle} ref={trackRef}>
            {visibleCards().map(({ index, position }) => {
              const product = products[index];
              if (!product) return null;
              const primaryImage =
                product.images?.find((img) => img.is_primary)?.image ||
                product.images?.[0]?.image;

              const transform =
                position === "active"
                  ? `translateX(calc(-50% + ${dragDelta * 0.04}px)) scale(1)`
                  : position === "prev"
                    ? `translateX(calc(-50% - 380px + ${dragDelta * 0.07}px)) scale(0.88) rotateY(8deg)`
                    : `translateX(calc(-50% + 380px + ${dragDelta * 0.07}px)) scale(0.88) rotateY(-8deg)`;

              const enterClass =
                position === "active" && isAnimating
                  ? direction === "next"
                    ? "card-enter-next"
                    : "card-enter-prev"
                  : "";

              return (
                <div
                  key={product.id + position}
                  className={enterClass}
                  style={{
                    ...cardBase,
                    ...(position === "active" ? cardActive : cardSide),
                    ...(enterClass ? { animation: undefined } : {}),
                    transform: enterClass ? undefined : transform,
                  }}
                  onClick={() => position !== "active" && manualGoTo(index)}
                >
                  {/* Badge */}
                  <span className={`badge ${product.category}`}>
                    {getCategoryName(product.category)}
                  </span>

                  {/* Image */}
                  <div style={imgWrap}>
                    <img
                      src={primaryImage}
                      alt={product.translations[0]?.name}
                      loading="lazy"
                      style={imgStyle}
                      draggable={false}
                    />
                    <div style={imgOverlay} />
                  </div>

                  {/* Info */}
                  <div style={infoStyle}>
                    <h3 style={nameStyle}>{product.translations[0]?.name}</h3>
                    <p style={charStyle}>
                      {product.translations[0]?.character}
                    </p>
                    <div style={footerRow}>
                      <span style={priceStyle}>AED {product.price}</span>
                    </div>
                    <button
                      className="view-details-btn"
                      style={btnStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-2px) scale(1.02)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 25px rgba(30,58,41,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 15px rgba(30,58,41,0.15)";
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.transform = "scale(0.97)";
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-2px) scale(1.02)";
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/`);
                      }}
                    >
                      <FaEye style={{ fontSize: "13px" }} />
                      {t("featured.more")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ARROWS */}
          {products.length > 1 && (
            <>
              <button
                style={{ ...arrowBtn, left: "24px" }}
                onClick={() =>
                  manualGoTo(
                    (current - 1 + products.length) % products.length,
                    "prev",
                  )
                }
                aria-label="Previous"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                style={{ ...arrowBtn, right: "24px" }}
                onClick={() =>
                  manualGoTo((current + 1) % products.length, "next")
                }
                aria-label="Next"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* DOTS */}
      {products.length > 1 && (
        <div style={dotsWrap}>
          {products.map((_, i) => (
            <button
              key={i}
              style={{ ...dotBase, ...(i === current ? dotActive : {}) }}
              onClick={() => manualGoTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ====================== STYLES ====================== */

const sliderWrap = {
  position: "relative",
  height: "500px",
  marginTop: "32px",
  userSelect: "none",
};

const loaderWrap = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  height: "460px",
  marginTop: "32px",
};

const skeletonCard = {
  width: "300px",
  height: "420px",
  borderRadius: "20px",
  background: "linear-gradient(110deg, #f0ede8 30%, #faf9f6 50%, #f0ede8 70%)",
  backgroundSize: "200% 100%",
};

const stageStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  perspective: "1200px",
};

const cardBase = {
  position: "absolute",
  left: "50%",
  top: "50%",
  marginTop: "-210px",
  width: "330px",
  borderRadius: "20px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  transition:
    "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease, box-shadow 0.4s ease",
  cursor: "pointer",
  transformStyle: "preserve-3d",
};

const cardActive = {
  zIndex: 3,
  opacity: 1,
  boxShadow:
    "0 30px 80px rgba(43,47,46,0.18), 0 8px 24px rgba(198,162,90,0.15)",
  cursor: "default",
};

const cardSide = {
  zIndex: 1,
  opacity: 0.55,
};

const imgWrap = {
  position: "relative",
  width: "100%",
  height: "285px",
  overflow: "hidden",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.6s ease",
  display: "block",
};

const imgOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(27,31,30,0.5) 0%, transparent 50%)",
};

// badge styles handled by global CSS classes (.badge.men/.women/.unisex)

const infoStyle = {
  padding: "16px 18px 18px",
  background: "#fff",
};

const nameStyle = {
  fontSize: "0.97rem",
  fontWeight: 700,
  color: "var(--color-text-dark)",
  marginBottom: "5px",
  lineHeight: 1.4,
};

const charStyle = {
  fontSize: "0.78rem",
  color: "var(--color-text-light)",
  marginBottom: "14px",
  lineHeight: 1.6,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const footerRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const priceStyle = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "var(--color-gold)",
  letterSpacing: "0.5px",
};

const btnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "10px 15px",
  width: "100%",
  marginTop: "12px",
  borderRadius: "25px",
  border: "none",
  background: "#c6a25a",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 15px rgba(30,58,41,0.15)",
  fontSize: "14px",
  fontFamily: "inherit",
};

const arrowBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "1.5px solid var(--color-border)",
  background: "rgba(255,255,255,0.95)",
  color: "var(--color-text-dark)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(0,0,0,0.09)",
  transition: "all 0.25s ease",
  backdropFilter: "blur(8px)",
};

const dotsWrap = {
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "24px",
};

const dotBase = {
  width: "8px",
  height: "8px",
  borderRadius: "4px",
  background: "var(--color-border)",
  border: "none",
  cursor: "pointer",
  transition: "all 0.35s ease",
  padding: 0,
};

const dotActive = {
  width: "28px",
  background: "var(--color-gold)",
};
