import React from "react";
import ProductCard from "./ProductCard";
import { useInView } from "../../../hooks/useInView";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../Context/LanguageContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FeaturesProducts.module.css";
import { FaEye } from "react-icons/fa";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [ref, isInView] = useInView();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // ✅ ترجمة الكاتيجوري حسب اللغة
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
      const response = await axiosInstance.get("/api/products/?page_size=1");
      setProducts(response.data.results);
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

  return (
    <section
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
      className="section"
      id="featured"
      ref={ref}
    >
      <div className="container">
        {/* HEADER */}
        <div className={`section-header fade-in ${isInView ? "visible" : ""}`}>
          <span className="section-subtitle">✦ {t("featured.subtitle")}</span>

          <h2 className="section-title">{t("featured.title")}</h2>

          <div className="section-divider" />

          <p className="section-desc">{t("featured.desc")}</p>
        </div>

        {/* GRID */}
        <div className={styles["product-grid"]}>
          {/* ✅ منتجات API */}
          {products.map((product) => {
            const primaryImage =
              product.images?.find((img) => img.is_primary)?.image ||
              product.images?.[0]?.image;

            return (
              <div className="product-card" key={product.id}>
                <div style={{ height: "302px" }} className="card-img">
                  <span className={`badge ${product.category}`}>
                    {getCategoryName(product.category)}
                  </span>

                  <img
                    src={primaryImage}
                    alt={product.translations[0].name}
                    loading="lazy"
                  />
                </div>

                <div className="card-info">
                  <h3>{product.translations[0].name}</h3>

                  <p className="character">
                    {product.translations[0].character}
                  </p>

                  <div className="card-price">AED {product.price}</div>

                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/products/`)}
                  >
                    <FaEye /> {t("featured.more")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
