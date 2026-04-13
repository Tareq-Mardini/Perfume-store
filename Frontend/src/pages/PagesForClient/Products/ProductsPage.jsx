import { useState, useEffect } from "react";
import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import AsideFilter from "./AsideFilter";
import "./productsStye.css";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaFilter,
} from "react-icons/fa";

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [searchInput, setSearchInput] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [SotpNext, setSotpNext] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    setSearchParams({
      search: searchInput,
      page: 1,
    });

    setSearchInput("");
  };

  const primaryImage =
    products.images?.find((img) => img.is_primary)?.url ||
    products.images?.[0]?.url;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(products);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log("Tareq");
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
    fetchProducts();
    setSidebarOpen(false);
  }, [searchParams.toString()]);

  return (
    <>
      <Navbar />
      <div className="page-header">
        <div className="section-label">Shops</div>
        <h1>Our Products</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button onClick={handleSearch}>
            <FaSearch /> Search
          </button>
        </div>
      </div>
      <div style={{ marginTop: "-50px" }} className="container">
        <div className="shop-wrapper">
          {/* SIDEBAR */}
          <AsideFilter
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {/* MAIN */}
          <main className="main-content">
            {/* <div className="section-header">
              <h3>Products</h3>

              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <button onClick={handleSearch}>
                  <FaSearch /> Search
                </button>
              </div>
            </div> */}

            <button className="filter-btn" onClick={toggleSidebar}>
              <FaFilter /> Filters
            </button>

            <div className="product-grid">
              {products.map((product) => {
                const primaryImage =
                  product.images?.find((img) => img.is_primary)?.image ||
                  product.images?.[0]?.image ||
                  "https://via.placeholder.com/300";

                return (
                  <div className="product-card" key={product.id}>
                    <div className="card-img">
                      {/* BADGE */}
                      <span className={`badge ${product.category}`}>
                        {product.category}
                      </span>

                      {/* HOVER ACTIONS */}
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

                      {/* ✅ الصورة الصح */}
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

                      <div className="card-price">AED {product.price}</div>

                      <button
                        className="view-details-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <FaEye /> View Details
                      </button>
                    </div>
                  </div>
                );
              })}
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
                  Prev
                </button>

                <button className="pagination-btn">Page {page}</button>

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
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="overlay active" onClick={toggleSidebar}></div>
      )}
      <Footer />
    </>
  );
}
