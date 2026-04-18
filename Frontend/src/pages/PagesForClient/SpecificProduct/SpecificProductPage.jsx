import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { getFullImageUrl } from "../../../utils/image";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "./SpecificProductStyle.css";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBox,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaClock,
  FaWind,
  FaLayerGroup,
  FaLeaf,
  FaHeart,
  FaFire,
} from "react-icons/fa";
import { FaSearch, FaEye, FaFilter } from "react-icons/fa";

import { useCart } from "../../../hooks/useCart";

export default function SpecificProduct() {
  const [products, setProducts] = useState([]);
  const [activeNote, setActiveNote] = useState("top");
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [primaryImage, setPrimaryImage] = useState("");
  const navigate = useNavigate();
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
        console.log(response);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };

    fetchProduct();
  }, [id]);

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
  }, []);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="loading-state">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  const data = product.translations[0];

  return (
    <>
      <Navbar />
      <div className="page-header" style={{ marginBottom: "0px" }}>
        <div className="section-label">Product</div>
        <h1>{data.name}</h1>
        <p>
          Discover the details, notes, and craftsmanship behind this fragrance
        </p>
      </div>



      <div className="container">
        <Link to="/products" className="back-btn">
          <FaArrowLeft /> Back to shopping
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
              <FaLayerGroup /> {product.category}
            </p>

            <div className="price">
              ${product.price}
              <span style={{ marginLeft: "20px" }} className="old-price">
                $60.00
              </span>
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
              style={{ fontWeight: "bold", marginTop: "20px" }}
              className="selector-label"
            >
              Size/Volume
            </span>
            <div className="size-selector">
              <button className="size-btn active">30 ml</button>
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
                <FaShoppingCart style={{ marginRight: "8px" }} />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        {/* NOTES */}
        <div className="notes-section">
          {/* BUTTONS */}
          <div className="notes-tabs">
            <button
              className={activeNote === "top" ? "active" : ""}
              onClick={() => setActiveNote("top")}
            >
              <FaLeaf /> Top Notes
            </button>

            <button
              className={activeNote === "heart" ? "active" : ""}
              onClick={() => setActiveNote("heart")}
            >
              <FaHeart /> Heart Notes
            </button>

            <button
              className={activeNote === "base" ? "active" : ""}
              onClick={() => setActiveNote("base")}
            >
              <FaFire /> Base Notes
            </button>
          </div>

          {/* CONTENT */}
          <div
            key={activeNote}
            className="note-content"
            style={{ maxWidth: "900px", margin: "auto" }}
          >
            {activeNote === "top" && <p>{data.top_notes}</p>}
            {activeNote === "heart" && <p>{data.heart_notes}</p>}
            {activeNote === "base" && <p>{data.base_notes}</p>}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "0px" }} className="container">
        <Link to="/products" className="back-btn">
          <FaArrowLeft /> See more products
        </Link>
        <div className="product-grid-">
          {products.map((product) => {
            const primaryImage =
              product.images?.find((img) => img.is_primary)?.image ||
              product.images?.[0]?.image;

            return (
              <div className="product-card" key={product.id}>
                <div className="card-img">
                  {/* BADGE */}
                  <span className={`badge ${product.category}`}>
                    {product.category}
                  </span>

                  {/* HOVER ACTIONS */}
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

                  <div className="card-price">
                    AED{" "}
                    <span style={{ color: "#2B2F2E" }}>{product.price}</span>
                  </div>

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
      </div>

      <Footer />
    </>
  );
}
