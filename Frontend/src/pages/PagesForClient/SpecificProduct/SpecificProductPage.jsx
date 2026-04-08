import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import "./SpecificProductStyle.css";
import product1 from "../../../imagesTest/1.jpg";
import product2 from "../../../imagesTest/2.jpg";
import {
  FaShoppingCart,
  FaClock,
  FaWind,
  FaLayerGroup,
  FaLeaf,
  FaHeart,
  FaFire,
} from "react-icons/fa";

import { useCart } from "../../../hooks/useCart";

export default function SpecificProduct() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}/`);
        const data = response.data;

        setProduct(data);

        const primary =
          data.images.find((img) => img.is_primary)?.image ||
          data.images[0]?.image;

        setSelectedImage(primary);
        console.log(response);
      } catch (error) {
        console.error("ERROR: ", error);
      }
    };

    fetchProduct();
  }, [id]);

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

      <div className="container">
        <div className="product-details">
          {/* IMAGES */}
          <div className="product-images">
            <div className="main-image">
              <img src={product1} alt={data.name} />
            </div>

            <div className="thumbnail-list">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={product2}
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

            <div className="price">${product.price}</div>

            <p className="description">{data.description}</p>

            {/* NOTES */}
            <div className="notes">
              <div className="note-box">
                <h4>
                  <FaLeaf className="note-icon" />
                  Top Notes
                </h4>
                <p>{data.top_notes}</p>
              </div>

              <div className="note-box">
                <h4>
                  <FaHeart className="note-icon" />
                  Heart Notes
                </h4>
                <p>{data.heart_notes}</p>
              </div>

              <div className="note-box">
                <h4>
                  <FaFire className="note-icon" />
                  Base Notes
                </h4>
                <p>{data.base_notes}</p>
              </div>
            </div>

            {/* EXTRA */}
            <div className="extra">
              <span>
                <FaClock /> {data.longevity}
              </span>
              <span>
                <FaWind /> {data.sillage}
              </span>
            </div>

            <button
              className="add-cart-btn"
              onClick={() => {
                addItem({
                  id: product.id,
                  name: data.name,
                  price: product.price,
                  image: product1,
                });
              }}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}