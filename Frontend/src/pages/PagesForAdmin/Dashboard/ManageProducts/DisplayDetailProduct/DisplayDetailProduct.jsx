import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstanceAdmin from "../../../../../api/axiosInstanceAdmin";
import "./DisplayDetailProduct.css";

export default function DisplayDetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axiosInstanceAdmin.get(`/api/admin/products/${id}/`);
      setProduct(res.data);

      // 🔥 أول صورة تكون الافتراضية
      const primary = res.data.images.find((i) => i.is_primary);
      setSelectedImage(primary?.image || res.data.images[0]?.image);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      {/* 🔥 Top Section */}
      <div className="product-top">
        {/* 🖼️ Image Gallery */}
        <div className="product-image">
          {/* الصورة الرئيسية */}
          <div className="main-image-wrapper">
            <img src={selectedImage} alt="product" className="main-img" />
          </div>

          {/* الصور الصغيرة */}
          <div className="thumbs-grid">
            {product.images?.map((img) => (
              <div
                key={img.image}
                className={`thumb-box ${
                  selectedImage === img.image ? "active" : ""
                }`}
                onClick={() => setSelectedImage(img.image)}
              >
                <img src={img.image} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* 🧾 Info */}
        <div className="product-info">
          <h1>{product.translations[1]?.name}</h1>
          <p className="price">${product.price}</p>
          <p className="category">{product.category}</p>
        </div>
      </div>

      {/* 🌍 كل اللغات */}
      <div className="translations">
        {product.translations.map((t, index) => (
          <div key={index} className="lang-box" st>
            <h2>{t.language_code.toUpperCase()}</h2>

            <h3>{t.name}</h3>

            <p className="desc">{t.description}</p>

            <div className="notes">
              <p>
                <strong>Top:</strong> {t.top_notes}
              </p>
              <p>
                <strong>Heart:</strong> {t.heart_notes}
              </p>
              <p>
                <strong>Base:</strong> {t.base_notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
