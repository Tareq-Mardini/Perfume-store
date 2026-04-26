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
import product1 from "../../../assets/images/product-1.jpg";
import product2 from "../../../assets/images/product-4.jpg";
import product3 from "../../../assets/images/product-4.jpg";

const productsStatic = [
  {
    id: 3,
    name: "Golden Bakhoor",
    category: "Bakhoor Collection",
    price: 0,
    rating: 0,
    reviews: 0,
    image: product1,
    badge: null,
    isComingSoon: true,
    comingSoonLabel: "Bakhoor",
  },
  {
    id: 4,
    name: "Luxury Tasbih",
    category: "Tasbih Collection",
    price: 0,
    rating: 0,
    reviews: 0,
    image: product2,
    badge: null,
    isComingSoon: true,
    comingSoonLabel: "Prayer Beads",
  },
  {
    id: 5,
    name: "Luxury Tasbih",
    category: "Tasbih Collection",
    price: 0,
    rating: 0,
    reviews: 0,
    image: product3,
    badge: null,
    isComingSoon: true,
    comingSoonLabel: "Gift boxes",
  },
];

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
                <div className="card-img">
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

          {/* ✅ منتجات static */}
          {productsStatic.map((product, i) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                name:
                  product.id === 3
                    ? t("featured.bakhoor")
                    : product.id === 4
                      ? t("featured.tasbih")
                      : t("featured.gifts"),
                category:
                  product.id === 3
                    ? t("featured.bakhoorCategory")
                    : product.category,
                comingSoonLabel:
                  product.id === 3
                    ? t("featured.bakhoor")
                    : product.id === 4
                      ? t("featured.tasbih")
                      : t("featured.gifts"),
              }}
              delay={i + 1}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}