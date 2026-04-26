import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getDetailProductAdmin,
  updateProduct,
} from "../../../../../services/productsService";
import "../CreateProduct/CreateProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ جلب البيانات
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

  // 🧠 handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🌍 translations
  const handleTranslationChange = (index, e) => {
    const newTranslations = [...form.translations];
    newTranslations[index][e.target.name] = e.target.value;
    setForm({ ...form, translations: newTranslations });
  };

  // 🚀 submit
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

      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        alert("Error updating ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <p>Loading...</p>;

  return (
    <>
      <Link to="/admin/products">
        <button className="btn-create-product">Back to Products</button>
      </Link>

      <form onSubmit={handleSubmit} className="create-product-page">
        <h2>Edit Product</h2>

        {/* 🔹 Basic Info */}
        <div className="grid-2">
          <div className="form-group">
            <label>Price</label>
            <input name="price" value={form.price} onChange={handleChange} />
            {errors.price && <p className="error">{errors.price[0]}</p>}
          </div>

          <div className="form-group">
            <label>Price Before Discount</label>
            <input
              name="price_before_discount"
              value={form.price_before_discount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bottle Volume</label>
            <input
              name="bottle_volume"
              value={form.bottle_volume}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="unisex">unisex</option>
              <option value="men">men</option>
              <option value="women">women</option>
            </select>
          </div>
        </div>

        {/* 🌍 Translations */}
        {form.translations.map((t, index) => (
          <div key={index} className="translation-box">
            <h3>{t.language_code.toUpperCase()}</h3>

            <div className="grid-2">
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  value={t.name || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>Character</label>
                <input
                  name="character"
                  value={t.character || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>Sillage</label>
                <input
                  name="sillage"
                  value={t.sillage || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>Longevity</label>
                <input
                  name="longevity"
                  value={t.longevity || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={t.description || ""}
                onChange={(e) => handleTranslationChange(index, e)}
              />
            </div>

            {/* 🔥 NEW FIELDS */}
            <div className="grid-2">
              <div className="form-group">
                <label>Top Notes</label>
                <input
                  name="top_notes"
                  value={t.top_notes || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <div className="form-group">
                <label>Heart Notes</label>
                <input
                  name="heart_notes"
                  value={t.heart_notes || ""}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
              </div>

              <div className="form-group">
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

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </>
  );
}
