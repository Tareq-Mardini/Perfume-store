import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./DisplayDetailProduct.module.css";
import { getDetailProductAdmin } from "../../../../../services/productsService";

const langLabel = { en: "English", ar: "العربية" };

export default function DisplayDetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getDetailProductAdmin(id);
      setProduct(res);
      const primary = res.images.find((i) => i.is_primary);
      setSelectedImage(primary?.image || res.images[0]?.image);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className={styles.loading}>Loading...</p>;

  const enTranslation = product.translations.find(
    (t) => t.language_code === "en",
  );

  return (
    <div className={styles.wrapper}>
      {/* ===== BACK ===== */}
      <Link to="/admin/products">
        <button className={styles.btnBack}>← Back to Products</button>
      </Link>

      {/* ===== TOP: IMAGE + INFO ===== */}
      <div className={styles.productTop}>
        {/* Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            <img
              src={selectedImage}
              alt={enTranslation?.name}
              className={styles.mainImg}
            />
          </div>

          <div className={styles.thumbsGrid}>
            {product.images?.map((img) => (
              <div
                key={img.image}
                className={`${styles.thumbBox} ${
                  selectedImage === img.image ? styles.thumbBoxActive : ""
                }`}
                onClick={() => setSelectedImage(img.image)}
              >
                <img src={img.image} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.infoSection}>
          <span className={styles.categoryBadge}>{product.category}</span>

          <h1 className={styles.productName}>{enTranslation?.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>AED {product.price}</span>
            {product.price_before_discount && (
              <span className={styles.priceBefore}>
                AED {product.price_before_discount}
              </span>
            )}
          </div>

          <hr className={styles.divider} />

          <div className={styles.specsGrid}>
            <div className={styles.specCard}>
              <p className={styles.specLabel}>Bottle Volume</p>
              <p className={styles.specValue}>{product.bottle_volume} ml</p>
            </div>
            <div className={styles.specCard}>
              <p className={styles.specLabel}>Category</p>
              <p
                className={styles.specValue}
                style={{ textTransform: "capitalize" }}
              >
                {product.category}
              </p>
            </div>
            <div className={styles.specCard}>
              <p className={styles.specLabel}>Sillage</p>
              <p className={styles.specValue}>
                {enTranslation?.sillage || "—"}
              </p>
            </div>
            <div className={styles.specCard}>
              <p className={styles.specLabel}>Longevity</p>
              <p className={styles.specValue}>
                {enTranslation?.longevity || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TRANSLATIONS ===== */}
      <p className={styles.sectionTitle}>Translations</p>

      <div className={styles.translations}>
        {product.translations.map((t, index) => (
          <div
            key={index}
            dir={t.language_code === "ar" ? "rtl" : "ltr"}
            className={styles.langBox}
          >
            {/* Lang header */}
            <div className={styles.langHeader}>
              <span className={styles.langBadge}>
                {t.language_code.toUpperCase()}
              </span>
              <h3 className={styles.langName}>
                {langLabel[t.language_code] || t.language_code}
              </h3>
            </div>

            <h2 className={styles.productTitle}>{t.name}</h2>
            <p className={styles.desc}>{t.description}</p>

            {/* Notes */}
            <div className={styles.notesGrid}>
              <div className={styles.noteCard}>
                <p className={styles.noteLabel}>Top Notes</p>
                <p className={styles.noteValue}>{t.top_notes || "—"}</p>
              </div>
              <div className={styles.noteCard}>
                <p className={styles.noteLabel}>Heart Notes</p>
                <p className={styles.noteValue}>{t.heart_notes || "—"}</p>
              </div>
              <div className={styles.noteCard}>
                <p className={styles.noteLabel}>Base Notes</p>
                <p className={styles.noteValue}>{t.base_notes || "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}