import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getDetailProductAdmin,
  updateProduct,
} from "../../../../../services/productsService";
import styles from "../CreateProduct/CreateProduct.module.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getDetailProductAdmin(id);
        setForm({
          price: data.price || "",
          price_before_discount: data.price_before_discount || "",
          category: data.category || "",
          bottle_volume: data.bottle_volume || "",
          translations: data.translations || [],
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

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
      await updateProduct(id, form);
      alert("Product updated ✅");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      if (err.response?.data) setErrors(err.response.data);
      else alert("Error updating ❌");
    } finally {
      setLoading(false);
    }
  };

  const langLabel = { en: "English", ar: "العربية" };

  if (!form) return <p className={styles.loading}>Loading...</p>;

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
            Edit <span>Product</span>
          </h2>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className={styles.formBody}>
          {/* ── Basic Info ── */}
          <p className={styles.sectionTitle}>Basic Information</p>
          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label>Price</label>
              <input name="price" value={form.price} onChange={handleChange} />
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
              />
            </div>

            <div className={styles.formGroup}>
              <label>Bottle Volume (ml)</label>
              <input
                name="bottle_volume"
                value={form.bottle_volume}
                onChange={handleChange}
              />
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
                    value={t.name || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Character</label>
                  <input
                    name="character"
                    value={t.character || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Sillage</label>
                  <input
                    name="sillage"
                    value={t.sillage || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Longevity</label>
                  <input
                    name="longevity"
                    value={t.longevity || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={t.description || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <p className={styles.sectionTitle}>Notes</p>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Top Notes</label>
                  <input
                    name="top_notes"
                    value={t.top_notes || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Heart Notes</label>
                  <input
                    name="heart_notes"
                    value={t.heart_notes || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Base Notes</label>
                  <input
                    name="base_notes"
                    value={t.base_notes || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ── Submit ── */}
          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? "Updating..." : "✦ Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}