import { useState } from "react";
import {
  createProduct,
  uploadProductImages,
} from "../../../../../services/productsService.js";
import styles from "./CreateProduct.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {
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

      if (images.length <= 0) throw new Error("enter photo");

      const response = await createProduct({ ...form, images: [] });
      const productId = response.id || response.data?.id;
      if (!productId) throw new Error("ID not found");

      if (images.length > 0) await uploadProductImages(productId, images);

      alert("Product created successfully 🚀");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      if (err.response?.data) setErrors(err.response.data);
      else alert(err || "Error creating product ❌");
    } finally {
      setLoading(false);
    }
  };

  const langLabel = { en: "English", ar: "العربية" };

  return (
    <div className={styles.wrapper}>
      {/* ===== BACK ===== */}
      <Link to="/admin/products">
        <button className={styles.btnBack}>← Back to Products</button>
      </Link>

      {/* ===== FORM CARD ===== */}
      <div className={styles.formCard}>
        {/* Header */}
        <div className={styles.formHeader}>
          <div className={styles.formHeaderIcon}>✦</div>
          <h2>
            Create <span>Product</span>
          </h2>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className={styles.formBody}>
          {/* ── Basic Info ── */}
          <p className={styles.sectionTitle}>Basic Information</p>
          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 199"
              />
              {errors.price && (
                <span className={styles.fieldError}>{errors.price[0]}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Price Before Discount</label>
              <input
                name="price_before_discount"
                value={form.price_before_discount}
                onChange={handleChange}
                placeholder="e.g. 249"
              />
              {errors.price_before_discount && (
                <span className={styles.fieldError}>
                  {errors.price_before_discount[0]}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Bottle Volume (ml)</label>
              <input
                name="bottle_volume"
                value={form.bottle_volume}
                onChange={handleChange}
                placeholder="e.g. 100"
              />
              {errors.bottle_volume && (
                <span className={styles.fieldError}>
                  {errors.bottle_volume[0]}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">— Select —</option>
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
              {errors.category && (
                <span className={styles.fieldError}>{errors.category[0]}</span>
              )}
            </div>
          </div>

          {/* ── Translations ── */}
          {form.translations.map((t, index) => (
            <div key={index} className={styles.translationBox}>
              <div className={styles.translationHeader}>
                <span className={styles.langBadge}>
                  {t.language_code.toUpperCase()}
                </span>
                <h3>{langLabel[t.language_code]}</h3>
              </div>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    name="name"
                    value={t.name}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Character</label>
                  <input
                    name="character"
                    value={t.character}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Sillage</label>
                  <input
                    name="sillage"
                    value={t.sillage}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Longevity</label>
                  <input
                    name="longevity"
                    value={t.longevity}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={t.description}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <p className={styles.sectionTitle}>Notes</p>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Top Notes</label>
                  <input
                    name="top_notes"
                    value={t.top_notes}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Heart Notes</label>
                  <input
                    name="heart_notes"
                    value={t.heart_notes}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Base Notes</label>
                  <input
                    name="base_notes"
                    value={t.base_notes}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ── Upload ── */}
          <div className={styles.uploadBox}>
            <label>Upload Images</label>
            <input type="file" multiple onChange={handleImagesChange} />
            <p className={styles.uploadHint}>
              You can select multiple images at once
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
            {loading ? "Creating..." : "✦ Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}