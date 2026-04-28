import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { getFullImageUrl } from "../../../utils/image";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "./SpecificProductStyle.css";
import { useLanguage } from "../../../Context/LanguageContext";
import { useTranslation } from "react-i18next";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaClock,
  FaWind,
  FaLayerGroup,
  FaLeaf,
  FaHeart,
  FaFire,
  FaEye,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";

export default function SpecificProduct() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [products, setProducts] = useState([]);
  const [activeNote, setActiveNote] = useState("top");
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");

  const navigate = useNavigate();

  const getCategoryName = (category) => {
    if (language === "ar") {
      if (category === "unisex") return "رجالي ونسائي";
      if (category === "men") return "رجالي";
      if (category === "women") return "نسائي";
    }
    return category;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}/`);
        const data = response.data;

        setProduct(data);

        const primary =
          data.images.find((img) => img.is_primary)?.image ||
          data.images[0]?.image ||
          "";

        setPrimaryImage(primary);
        setSelectedImage(primary);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };

    fetchProduct();
  }, [id, language]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products/?page_size=4");
        setProducts(response.data.results);
      } catch (error) {
        setProducts([]);
        console.error("ERROR: ", error);
      }
    };

    fetchProducts();
  }, [language]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="loading-state">
          <h2>{t("productPage.loading")}</h2>
        </div>
        <Footer />
      </>
    );
  }

  const data = product.translations[0];

  return (
    <>
      <Navbar />

      {/* HEADER */}
      <div className="page-header" style={{ marginBottom: "0px" }}>
        <div className="section-label">{t("productPage.product")}</div>

        <h1>{data.name}</h1>

        <p>{t("productPage.discover")}</p>
      </div>

      <div className="container">
        <Link to="/products" className="back-btn">
          <FaArrowLeft />
          {t("productPage.backToShop")}
        </Link>

        <div className="product-details">
          {/* IMAGES */}
          <div className="product-images">
            <div className="main-image">
              <img
                key={selectedImage}
                src={selectedImage}
                alt={data.name}
                className="main-product-img"
              />
            </div>

            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.image}
                  alt="thumb"
                  className={selectedImage === img.image ? "active" : ""}
                  onClick={() => setSelectedImage(img.image)}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="product-info">
            <h2>{data.name}</h2>

            <p className="category">
              <FaLayerGroup />
              {getCategoryName(product.category)}
            </p>

            <div className="price">
              AED&nbsp;
              <span style={{ color: "var(--color-primary)" }}>
                {product.price}
              </span>
              {product.price_before_discount && (
                <span style={{ marginLeft: "20px" }} className="old-price">
                  AED&nbsp;{product.price_before_discount}
                </span>
              )}
            </div>

            <p className="description">{data.description}</p>

            <div className="extra">
              <span>
                <FaClock /> {data.longevity}
              </span>
              <span>
                <FaWind /> {data.sillage}
              </span>
            </div>

            <span
              className="selector-label"
              style={{ fontWeight: "bold", marginTop: "20px" }}
            >
              {t("productPage.size")}
            </span>

            <div className="size-selector">
              <button className="size-btn active">
                {product.bottle_volume} ml
              </button>

              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: data.name,
                    price: product.price,
                    image: getFullImageUrl(primaryImage),
                  });
                }}
                className="btn btn-buy"
              >
                <FaShoppingCart
                  style={{
                    [language === "ar" ? "marginLeft" : "marginRight"]: "8px",
                  }}
                />
                {t("productPage.addToCart")}
              </button>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="notes-section">
          <div className="notes-tabs">
            <button
              className={activeNote === "top" ? "active" : ""}
              onClick={() => setActiveNote("top")}
            >
              <FaLeaf />
              {t("productPage.topNotes")}
            </button>

            <button
              className={activeNote === "heart" ? "active" : ""}
              onClick={() => setActiveNote("heart")}
            >
              <FaHeart />
              {t("productPage.heartNotes")}
            </button>

            <button
              className={activeNote === "base" ? "active" : ""}
              onClick={() => setActiveNote("base")}
            >
              <FaFire />
              {t("productPage.baseNotes")}
            </button>
          </div>

          <div
            className="note-content"
            style={{ maxWidth: "900px", margin: "auto" }}
          >
            {activeNote === "top" && <p>{data.top_notes}</p>}
            {activeNote === "heart" && <p>{data.heart_notes}</p>}
            {activeNote === "base" && <p>{data.base_notes}</p>}
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div style={{ paddingTop: "0px" }} className="container">
        <Link to="/products" className="back-btn">
          <FaArrowLeft />
          {t("productPage.seeMore")}
        </Link>

        <div className="product-grid-">
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

                  <div className="hover-icons">
                    <span onClick={() => navigate(`/product/${product.id}`)}>
                      <FaShoppingCart />
                    </span>
                    <span onClick={() => navigate(`/product/${product.id}`)}>
                      <FaEye />
                    </span>
                  </div>

                  <img src={primaryImage} alt={product.translations[0].name} />
                </div>

                <div className="card-info">
                  <h3>{product.translations[0].name}</h3>

                  <p className="character">
                    {product.translations[0].character}
                  </p>

                  <div className="card-price">AED {product.price}</div>

                  <button
                    className="view-details-btn"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <FaEye /> {t("products.viewDetails")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
