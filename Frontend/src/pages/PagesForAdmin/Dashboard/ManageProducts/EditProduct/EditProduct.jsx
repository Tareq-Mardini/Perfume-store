import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getDetailProductAdmin,
  updateProduct,
} from "../../../../../services/productsService";
import styles from "../CreateProduct/CreateProduct.module.css";

export default function EditProduct() {
  const { t } = useTranslation();
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
      alert(t("adminEditProduct.success"));
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      if (err.response?.data) setErrors(err.response.data);
      else alert(t("adminEditProduct.error"));
    } finally {
      setLoading(false);
    }
  };

  const langLabel = { en: "English", ar: "العربية" };

  if (!form)
    return <p className={styles.loading}>{t("productPage.loading")}</p>;

  return (
    <div className={styles.wrapper}>
      {/* ===== BACK ===== */}
      <Link to="/admin/products">
        <button className={styles.btnBack}>
          ← {t("adminEditProduct.back")}
        </button>
      </Link>

      <div className={styles.formCard}>
        {/* Header */}
        <div className={styles.formHeader}>
          <div className={styles.formHeaderIcon}>✦</div>
          <h2>
            {t("adminEditProduct.title")}{" "}
            <span>{t("adminEditProduct.product")}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.formBody}>
          {/* Basic Info */}
          <p className={styles.sectionTitle}>
            {t("adminEditProduct.basicInfo")}
          </p>

          <div className={styles.grid2}>
            <div className={styles.formGroup}>
              <label>{t("adminEditProduct.price")}</label>
              <input name="price" value={form.price} onChange={handleChange} />
              {errors.price && (
                <span className={styles.fieldError}>{errors.price[0]}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>{t("adminEditProduct.priceBefore")}</label>
              <input
                name="price_before_discount"
                value={form.price_before_discount}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>{t("adminEditProduct.volume")}</label>
              <input
                name="bottle_volume"
                value={form.bottle_volume}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>{t("filters.categories")}</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">— {t("adminEditProduct.select")} —</option>
                <option value="unisex">{t("filters.unisex")}</option>
                <option value="men">{t("filters.men")}</option>
                <option value="women">{t("filters.women")}</option>
              </select>
            </div>
          </div>

          {/* Translations */}
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
                  <label>{t("adminEditProduct.name")}</label>
                  <input
                    name="name"
                    value={tr.name || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("adminEditProduct.character")}</label>
                  <input
                    name="character"
                    value={tr.character || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("productPage.sillage")}</label>
                  <input
                    name="sillage"
                    value={tr.sillage || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("productPage.longevity")}</label>
                  <input
                    name="longevity"
                    value={tr.longevity || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t("adminEditProduct.description")}</label>
                <textarea
                  name="description"
                  value={tr.description || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <p className={styles.sectionTitle}>
                {t("adminEditProduct.notes")}
              </p>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>{t("productPage.topNotes")}</label>
                  <input
                    name="top_notes"
                    value={tr.top_notes || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("productPage.heartNotes")}</label>
                  <input
                    name="heart_notes"
                    value={tr.heart_notes || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>{t("productPage.baseNotes")}</label>
                  <input
                    name="base_notes"
                    value={tr.base_notes || ""}
                    onChange={(e) => handleTranslationChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading
              ? t("adminEditProduct.updating")
              : `✦ ${t("adminEditProduct.update")}`}
          </button>
        </form>
      </div>
    </div>
  );
}