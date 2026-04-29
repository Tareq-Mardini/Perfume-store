import { useState } from "react";
import {
  createProduct,
  uploadProductImages,
} from "../../../../../services/productsService.js";
import styles from "./CreateProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreateProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    price: "",
    price_before_discount: "",
    category: "",
    bottle_volume: "",
    translations: [
      {
        language_code: "en",
        name: "",
        character: "",
        sillage: "",
        longevity: "",
        description: "",
        top_notes: "",
        heart_notes: "",
        base_notes: "",
      },
      {
        language_code: "ar",
        name: "",
        character: "",
        sillage: "",
        longevity: "",
        description: "",
        top_notes: "",
        heart_notes: "",
        base_notes: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTranslationChange = (index, e) => {
    const newTranslations = [...form.translations];
    newTranslations[index][e.target.name] = e.target.value;
    setForm({ ...form, translations: newTranslations });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});

      if (images.length <= 0) throw new Error(t("adminCreateProduct.noImage"));

      const response = await createProduct({ ...form, images: [] });
      const productId = response.id || response.data?.id;
      if (!productId) throw new Error("ID not found");

      if (images.length > 0) await uploadProductImages(productId, images);

      alert(t("adminCreateProduct.success"));
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      if (err.response?.data) setErrors(err.response.data);
      else alert(t("adminCreateProduct.error"));
    } finally {
      setLoading(false);
    }
  };

  const langLabel = { en: "English", ar: "العربية" };

  return (
    <div className={styles.wrapper}>
      {/* ===== BACK ===== */}
      <Link to="/admin/products">
        <button className={styles.btnBack}>
          ← {t("adminCreateProduct.back")}
        </button>
      </Link>

      {/* ===== FORM CARD ===== */}
      <div className={styles.formCard}>
        {/* Header */}
        <div className={styles.formHeader}>
          <div className={styles.formHeaderIcon}>✦</div>
          <h2>
            {t("adminCreateProduct.title")}{" "}
            <span>{t("adminCreateProduct.highlight")}</span>
          </h2>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className={styles.formBody}>
          {/* ── Basic Info ── */}
          <p className={styles.sectionTitle}>
            {t("adminCreateProduct.basicInfo")}
          </p>

          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label>{t("adminCreateProduct.price")}</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder={t("adminCreateProduct.pricePlaceholder")}
              />
              {errors.price && (
                <span className={styles.fieldError}>{errors.price[0]}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>{t("adminCreateProduct.priceBefore")}</label>
              <input
                name="price_before_discount"
                value={form.price_before_discount}
                onChange={handleChange}
                placeholder={t("adminCreateProduct.priceBeforePlaceholder")}
              />
              {errors.price_before_discount && (
                <span className={styles.fieldError}>
                  {errors.price_before_discount[0]}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>{t("adminCreateProduct.volume")}</label>
              <input
                name="bottle_volume"
                value={form.bottle_volume}
                onChange={handleChange}
                placeholder={t("adminCreateProduct.volumePlaceholder")}
              />
              {errors.bottle_volume && (
                <span className={styles.fieldError}>
                  {errors.bottle_volume[0]}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>{t("adminCreateProduct.category")}</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">{t("adminCreateProduct.select")}</option>
                <option value="unisex">{t("adminCreateProduct.unisex")}</option>
                <option value="men">{t("adminCreateProduct.men")}</option>
                <option value="women">{t("adminCreateProduct.women")}</option>
              </select>
              {errors.category && (
                <span className={styles.fieldError}>{errors.category[0]}</span>
              )}
            </div>
          </div>

          {/* ── Translations ── */}
          {form.translations.map((tr, index) => (
            <div key={index} className={styles.translationBox}>
              <div className={styles.translationHeader}>
                <span className={styles.langBadge}>
                  {tr.language_code.toUpperCase()}
                </span>
                <h3>{langLabel[tr.language_code]}</h3>
              </div>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.name")}</label>
                  <input
                    name="name"
                    value={tr.name}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.character")}</label>
                  <input
                    name="character"
                    value={tr.character}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.sillage")}</label>
                  <input
                    name="sillage"
                    value={tr.sillage}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.longevity")}</label>
                  <input
                    name="longevity"
                    value={tr.longevity}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t("adminCreateProduct.description")}</label>
                <textarea
                  name="description"
                  value={tr.description}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <p className={styles.sectionTitle}>
                {t("adminCreateProduct.notes")}
              </p>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.topNotes")}</label>
                  <input
                    name="top_notes"
                    value={tr.top_notes}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.heartNotes")}</label>
                  <input
                    name="heart_notes"
                    value={tr.heart_notes}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("adminCreateProduct.baseNotes")}</label>
                  <input
                    name="base_notes"
                    value={tr.base_notes}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ── Upload ── */}
          <div className={styles.uploadBox}>
            <label>{t("adminCreateProduct.upload")}</label>
            <input type="file" multiple onChange={handleImagesChange} />
            <p className={styles.uploadHint}>
              {t("adminCreateProduct.uploadHint")}
            </p>
          </div>

          {/* ── Preview ── */}
          {images.length > 0 && (
            <div className={styles.preview}>
              {images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt={`preview-${i}`}
                />
              ))}
            </div>
          )}

          {/* ── Submit ── */}
          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading
              ? t("adminCreateProduct.creating")
              : t("adminCreateProduct.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}