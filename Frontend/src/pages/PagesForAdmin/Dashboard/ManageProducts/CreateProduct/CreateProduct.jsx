import { useState } from "react";
import {
  createProduct,
  uploadProductImages,
} from "../../../../../services/productsService.js";
import "./CreateProduct.css";
import { Link } from "react-router-dom";

export default function CreateProduct() {
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

  // 📸 images
  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // 🧠 normal fields
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
      setErrors({}); // 🔥 clear old errors

      const response = await createProduct({
        ...form,
        images: [],
      });

      const productId = response.id || response.data?.id;

      if (!productId) throw new Error("ID not found");

      if (images.length > 0) {
        await uploadProductImages(productId, images);
      }

      alert("Product created successfully 🚀");
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        setErrors(err.response.data); // 🔥 backend errors
      } else {
        alert("Error creating product ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/admin/products">
        <button className="btn-create-product">Create New Product</button>
      </Link>
      <form onSubmit={handleSubmit} className="create-product-page">
        <h2>Create Product</h2>

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
            {errors.price_before_discount && (
              <p className="error">{errors.price_before_discount[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label>Bottle Volume</label>
            <input
              name="bottle_volume"
              value={form.bottle_volume}
              onChange={handleChange}
            />
            {errors.bottle_volume && (
              <p className="error">{errors.bottle_volume[0]}</p>
            )}
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
            {errors.category && <p className="error">{errors.category[0]}</p>}
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
                  value={t.name}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
                {errors?.translations?.[index]?.name?.[0] && (
                  <p className="error">{errors.translations[index].name[0]}</p>
                )}
              </div>

              <div className="form-group">
                <label>Character</label>
                <input
                  name="character"
                  value={t.character}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
                {errors?.translations?.[index]?.character?.[0] && (
                  <p className="error">
                    {errors.translations[index].character[0]}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Sillage</label>
                <input
                  name="sillage"
                  value={t.sillage}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
                {errors?.translations?.[index]?.sillage?.[0] && (
                  <p className="error">
                    {errors.translations[index].sillage[0]}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Longevity</label>
                <input
                  name="longevity"
                  value={t.longevity}
                  onChange={(e) => handleTranslationChange(index, e)}
                />
                {errors?.translations?.[index]?.longevity?.[0] && (
                  <p className="error">
                    {errors.translations[index].longevity[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                style={{ maxWidth: "100%" }}
                name="description"
                value={t.description}
                onChange={(e) => handleTranslationChange(index, e)}
              />
              {errors?.translations?.[index]?.description?.[0] && (
                <p className="error">
                  {errors.translations[index].description[0]}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* 📸 Upload */}
        <div className="upload-box">
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImagesChange} />
        </div>

        {/* 🖼️ Preview */}
        <div className="preview">
          {images.map((img, i) => (
            <img key={i} src={URL.createObjectURL(img)} alt="preview" />
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </>
  );
}
