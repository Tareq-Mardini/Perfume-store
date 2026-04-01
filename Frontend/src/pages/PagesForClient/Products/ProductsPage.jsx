import { useState } from "react";
import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import AsideFilter from "./AsideFilter";
import "./productsStye.css";

export default function ProductPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h3 className="filter-title">Products</h3>
        </div>
        <button className="filter-btn" onClick={toggleSidebar}>
          ☰ Filters
        </button>
        <div className="shop-wrapper">
          {/* SIDEBAR */}

          <AsideFilter sidebarOpen={sidebarOpen} />

          {/* MAIN */}
          <main className="main-content">
            <div className="product-grid">
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be" />
                <div className="card-info">
                  <h3>SilkSculpt Serum</h3>
                  <div className="card-price">$35</div>
                </div>
              </div>

              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b" />
                <div className="card-info">
                  <h3>HydraLuxe Serum</h3>
                  <div className="card-price">$20</div>
                </div>
              </div>
              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b" />
                <div className="card-info">
                  <h3>HydraLuxe Serum</h3>
                  <div className="card-price">$20</div>
                </div>
              </div>

              <div className="product-card">
                <img src="https://images.unsplash.com/photo-1612817288484-6f916006741a" />
                <div className="card-info">
                  <h3>Glow Cream</h3>
                  <div className="card-price">$50</div>
                </div>
              </div>
            </div>
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
