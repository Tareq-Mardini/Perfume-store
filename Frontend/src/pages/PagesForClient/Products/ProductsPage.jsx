import { useState, useEffect } from "react";
import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import AsideFilter from "./AsideFilter";
import "./productsStye.css";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaEye, FaFilter } from "react-icons/fa";
import { useLanguage } from "../../../Context/LanguageContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ProductPage() {
  const { t } = useTranslation(); // ✅
  const [searchParams, setSearchParams] = useSearchParams("");
  const [searchInput, setSearchInput] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [SotpNext, setSotpNext] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const location = useLocation();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const getCategoryName = (category) => {
    if (language === "ar") {
      if (category === "unisex") return "رجالي ونسائي";
      if (category === "men") return "رجالي";
      if (category === "women") return "نسائي";
    }
    return category;
  };

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setSearchParams({
      search: searchInput,
      page: 1,
    });
    setSearchInput("");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/products/", {
        params: Object.fromEntries(searchParams),
      });
      setProducts(response.data.results);
      setSotpNext(response.data.next);
    } catch (error) {
      setProducts([]);
      console.error("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setSidebarOpen(false);
  }, [searchParams.toString(), language]);

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);

      // ✅ تنظيف الرسالة بعد عرضها
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Munaryss | Shops</title>
      </Helmet>
      <Navbar />

      <div className="page-header">
        <div className="section-label">{t("products.label")}</div>
        <h1>{t("products.title")}</h1>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder={t("products.searchPlaceholder")}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={handleSearch}>
          <FaSearch /> {t("products.searchBtn")}
        </button>
      </div>

      <div style={{ marginTop: "-50px" }} className="container">
        <div className="shop-wrapper">
          <AsideFilter
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="main-content">
            <button className="filter-btn" onClick={toggleSidebar}>
              <FaFilter /> {t("products.filters")}
            </button>

            <div className="product-grid">
              {loading ? (
                <p>{t("empty.loading")}</p>
              ) : products.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon-wrapper">
                    <FaSearch className="no-results-icon" />
                  </div>
                  <h3>{t("empty.noResultsTitle")}</h3>
                  <p>{t("empty.noResultsDesc")}</p>
                </div>
              ) : (
                products.map((product) => {
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
                          <span
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <FaShoppingCart />
                          </span>
                          <span
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <FaEye />
                          </span>
                        </div>

                        <img
                          src={primaryImage}
                          alt={product.translations[0].name}
                        />
                      </div>

                      <div className="card-info">
                        <h3>{product.translations[0].name}</h3>

                        <p className="character">
                          {product.translations[0].character}
                        </p>

                        <div className="card-price">
                          AED{" "}
                          <span style={{ color: "#2B2F2E" }}>
                            {product.price}
                          </span>
                        </div>

                        <button
                          className="view-details-btn"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <FaEye /> {t("products.viewDetails")}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {products && products.length > 0 && (
              <div className="pagination">
                <button
                  onClick={() =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      page: page - 1,
                    })
                  }
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  {t("products.prev")}
                </button>

                <button className="pagination-btn">
                  {t("products.page")} {page}
                </button>

                <button
                  onClick={() =>
                    setSearchParams({
                      ...Object.fromEntries(searchParams),
                      page: page + 1,
                    })
                  }
                  className="pagination-btn"
                  disabled={SotpNext == null}
                >
                  {t("products.next")}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {sidebarOpen && (
        <div className="overlay active" onClick={toggleSidebar}></div>
      )}

      <Footer />
    </>
  );
}