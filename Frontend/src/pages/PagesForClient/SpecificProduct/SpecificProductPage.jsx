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
  const [activeNote, setActiveNote] = useState("top");
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
                    image: product1,
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

      <Footer />
    </>
  );
}