import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./DisplayDetailProduct.module.css";
import { getDetailProductAdmin } from "../../../../../services/productsService";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const langLabel = { en: "English", ar: "العربية" };

export default function DisplayDetailProduct() {
  const { t } = useTranslation();
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

  if (!product)
    return <p className={styles.loading}>{t("productPage.loading")}</p>;

  const enTranslation = product.translations.find(
    (tItem) => tItem.language_code === "en",
  );
  const arTranslation = product.translations.find(
    (tItem) => tItem.language_code === "ar",
  );

  return (
    <>
      {" "}
      <Helmet>
        <title>Munaryss | Products</title>
      </Helmet>
      <div style={{ paddingTop: "0px" }} className={styles.wrapper}>
        {/* ===== BACK ===== */}
        <Link to="/admin/products">
          <button className={styles.btnBack}>
            ← {t("adminProducts.title")} {t("adminProducts.highlight")}
          </button>
        </Link>

        {/* ===== TOP ===== */}
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
            <h1 className={styles.productName}>{arTranslation?.name}</h1>

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
                <p className={styles.specLabel}>{t("productPage.size")}</p>
                <p className={styles.specValue}>{product.bottle_volume} ml</p>
              </div>

              <div className={styles.specCard}>
                <p className={styles.specLabel}>{t("filters.categories")}</p>
                <p
                  className={styles.specValue}
                  style={{ textTransform: "capitalize" }}
                >
                  {product.category}
                </p>
              </div>

              <div className={styles.specCard}>
                <p className={styles.specLabel}>{t("productPage.sillage")}</p>
                <p className={styles.specValue}>
                  {enTranslation?.sillage || "—"}
                </p>
              </div>
              <div className={styles.specCard}>
                <p className={styles.specLabel}>{t("productPage.sillage")}</p>
                <p className={styles.specValue}>
                  {arTranslation?.sillage || "—"}
                </p>
              </div>

              <div className={styles.specCard}>
                <p className={styles.specLabel}>{t("productPage.longevity")}</p>
                <p className={styles.specValue}>
                  {enTranslation?.longevity || "—"}
                </p>
              </div>
              <div className={styles.specCard}>
                <p className={styles.specLabel}>{t("productPage.longevity")}</p>
                <p className={styles.specValue}>
                  {arTranslation?.longevity || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TRANSLATIONS ===== */}
        <p className={styles.sectionTitle}>{t("productPage.product")}</p>

        <div className={styles.translations}>
          {product.translations.map((tr, index) => (
            <div
              key={index}
              dir={tr.language_code === "ar" ? "rtl" : "ltr"}
              className={styles.langBox}
            >
              <div className={styles.langHeader}>
                <span className={styles.langBadge}>
                  {tr.language_code.toUpperCase()}
                </span>
                <h3 className={styles.langName}>
                  {langLabel[tr.language_code] || tr.language_code}
                </h3>
              </div>

              <h2 className={styles.productTitle}>{tr.name}</h2>
              <p className={styles.desc}>{tr.description}</p>

              {/* Notes */}
              <div className={styles.notesGrid}>
                <div className={styles.noteCard}>
                  <p className={styles.noteLabel}>
                    {t("productPage.topNotes")}
                  </p>
                  <p className={styles.noteValue}>{tr.top_notes || "—"}</p>
                </div>

                <div className={styles.noteCard}>
                  <p className={styles.noteLabel}>
                    {t("productPage.heartNotes")}
                  </p>
                  <p className={styles.noteValue}>{tr.heart_notes || "—"}</p>
                </div>

                <div className={styles.noteCard}>
                  <p className={styles.noteLabel}>
                    {t("productPage.baseNotes")}
                  </p>
                  <p className={styles.noteValue}>{tr.base_notes || "—"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}