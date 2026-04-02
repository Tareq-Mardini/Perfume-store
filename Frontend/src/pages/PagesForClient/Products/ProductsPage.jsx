import { useState, useEffect } from "react";
import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import AsideFilter from "./AsideFilter";
import "./productsStye.css";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="container">
        <div className="shop-wrapper">
          {/* SIDEBAR */}

          <AsideFilter
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* MAIN */}
          <main className="main-content">
            <div className="section-header">
              <h3>Products</h3>

              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
            <button className="filter-btn" onClick={toggleSidebar}>
              ☰ Filters
            </button>
            {loading && (
              <div className="loading-state">
                <h2>Loading...</h2>
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="not-found-state">
                <h2>Not Found</h2>
                <p>
                  Sorry, we couldn’t find any products matching your search.
                </p>
              </div>
            )}
            <div className="product-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={
                      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    }
                    alt={product.translations[0].name}
                  />
                  <div className="card-info">
                    <h3>{product.translations[0].name}</h3>
                    <div className="card-price">${product.price}</div>
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
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

                <span className="pagination-info">Page {page}</span>

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
