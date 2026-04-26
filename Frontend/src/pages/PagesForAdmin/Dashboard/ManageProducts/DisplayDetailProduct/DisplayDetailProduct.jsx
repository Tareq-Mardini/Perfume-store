import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstanceAdmin from "../../../../../api/axiosInstanceAdmin";
import styles from "./DisplayDetailProduct.module.css";
import { getDetailProductAdmin } from "../../../../../services/productsService";
import { Link } from "react-router-dom";

export default function DisplayDetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getDetailProductAdmin(id);
      setProduct(res);

      // 🔥 أول صورة تكون الافتراضية
      const primary = res.images.find((i) => i.is_primary);
      setSelectedImage(primary?.image || res.images[0]?.image);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      {" "}
      <Link to="/admin/products">
        <button className="btn-create-product">Back to Products</button>
      </Link>
      <div className={styles.productDetail}>
        <div className={styles.productTop}>
          <div className={styles.productImage}>
            <div className={styles.mainImageWrapper}>
              <img src={selectedImage} className={styles.mainImg} />
            </div>

            <div className={styles.thumbsGrid}>
              {product.images?.map((img) => (
                <div
                  key={img.image}
                  className={`${styles.thumbBox} ${
                    selectedImage === img.image ? styles.active : ""
                  }`}
                  onClick={() => setSelectedImage(img.image)}
                >
                  <img src={img.image} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productInfo}>
            <h1>{product.translations[1]?.name}</h1>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.category}>{product.category}</p>
          </div>
        </div>

        <div className={styles.translations}>
          {product.translations.map((t, index) => (
            <div
              dir={t.language_code === "ar" ? "rtl" : "ltr"}
              key={index}
              className={styles.langBox}
            >
              <h2>{t.language_code.toUpperCase()}</h2>
              <h3>{t.name}</h3>
              <p className={styles.desc}>{t.description}</p>

              <div className={styles.notes}>
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
    </>
  );
}
