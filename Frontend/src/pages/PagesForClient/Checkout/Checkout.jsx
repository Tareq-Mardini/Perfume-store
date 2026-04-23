import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBox,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Checkout.css";
import Navbar from "../../../components/ForClient/Navbar";
import Footer from "../../../components/ForClient/Footer";
import { useCart } from "../../../hooks/useCart";
import axiosInstance from "../../../api/axiosInstance";
import { useTranslation } from "react-i18next";

export const Checkout = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [itemsOfCart, setitemsOfCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, setItems } = useCart();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    city: "Dubai",
    area: "",
    street: "",
    building_number: "",
    delivery_notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setitemsOfCart(items);
    if (items.length === 0) navigate("/products");
  }, [items]);

  const total = itemsOfCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = t("checkout.errors.nameRequired");
    } else if (formData.customer_name.length < 3) {
      newErrors.customer_name = t("checkout.errors.nameMin");
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = t("checkout.errors.phoneRequired");
    } else if (!/^\d{7,15}$/.test(formData.customer_phone)) {
      newErrors.customer_phone = t("checkout.errors.phoneInvalid");
    }

    if (!formData.area.trim()) {
      newErrors.area = t("checkout.errors.areaRequired");
    }

    if (!formData.building_number) {
      newErrors.building_number = t("checkout.errors.buildingRequired");
    } else if (Number(formData.building_number) <= 0) {
      newErrors.building_number = t("checkout.errors.buildingInvalid");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const items = itemsOfCart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const payload = {
        ...formData,
        items,
      };

      await axiosInstance.post("/api/orders/", payload);

      localStorage.removeItem("cart");
      setItems([]);
      navigate("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (itemsOfCart.length === 0) return null;

  return (
    <>
      <Navbar />

      <div className="checkout">
        <div className="checkout-container">
          {/* LEFT */}
          <div className="checkout-left">
            <Link to="/products" className="back-btn">
              <FaArrowLeft />
              {t("checkout.back")}
            </Link>

            <div className="checkout-card">
              <div className="checkout-header">
                <div>
                  <h1>{t("checkout.title")}</h1>
                  <p>{t("checkout.subtitle")}</p>
                </div>
                <FaMapMarkerAlt />
              </div>

              <form onSubmit={handleSubmit} className="form">
                <h2>{t("checkout.contact")}</h2>

                <div className="input-group">
                  <label>{t("checkout.fullName")} *</label>
                  <input
                    name="customer_name"
                    placeholder={t("checkout.namePlaceholder")}
                    value={formData.customer_name}
                    onChange={handleChange}
                    className={errors.customer_name ? "input-error" : ""}
                  />
                  {errors.customer_name && (
                    <span className="error">{errors.customer_name}</span>
                  )}
                </div>

                <div className="input-group">
                  <label>{t("checkout.phone")} *</label>
                  <div className="phone">
                    <span>+971</span>
                    <input
                      dir="ltr"
                      style={{ textAlign: "left" }}
                      name="customer_phone"
                      placeholder={t("checkout.phonePlaceholder")}
                      value={formData.customer_phone}
                      onChange={handleChange}
                      className={errors.customer_phone ? "input-error" : ""}
                    />
                  </div>
                  {errors.customer_phone && (
                    <span className="error">{errors.customer_phone}</span>
                  )}
                </div>

                <h2>{t("checkout.address")}</h2>

                <div className="input-group">
                  <label>{t("checkout.city")}</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option>Dubai</option>
                    <option>Abu Dhabi</option>
                    <option>Sharjah</option>
                    <option>Ajman</option>
                    <option>Ras Al Khaimah</option>
                    <option>Fujairah</option>
                    <option>Umm Al Quwain</option>
                    <option>Al Ain</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>{t("checkout.area")} *</label>
                  <input
                    name="area"
                    placeholder={t("checkout.areaPlaceholder")}
                    value={formData.area}
                    onChange={handleChange}
                    className={errors.area ? "input-error" : ""}
                  />
                  {errors.area && <span className="error">{errors.area}</span>}
                </div>

                <div className="input-group">
                  <label>{t("checkout.street")}</label>
                  <input
                    name="street"
                    placeholder={t("checkout.streetPlaceholder")}
                    value={formData.street}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>{t("checkout.building")} *</label>
                  <input
                    type="number"
                    name="building_number"
                    placeholder={t("checkout.buildingPlaceholder")}
                    value={formData.building_number}
                    onChange={handleChange}
                    className={errors.building_number ? "input-error" : ""}
                  />
                  {errors.building_number && (
                    <span className="error">{errors.building_number}</span>
                  )}
                </div>

                <div className="input-group">
                  <label>{t("checkout.notes")}</label>
                  <textarea
                    name="delivery_notes"
                    placeholder={t("checkout.notesPlaceholder")}
                    value={formData.delivery_notes}
                    onChange={handleChange}
                  />
                </div>

                <h2>{t("checkout.payment")}</h2>

                <div className="payment">
                  <FaCreditCard />
                  <div>
                    <h4>{t("checkout.codTitle")}</h4>
                    <p>{t("checkout.codDesc")}</p>
                  </div>
                  <FaShieldAlt />
                </div>

                <button disabled={isSubmitting} className="submit-btn">
                  {isSubmitting
                    ? t("checkout.processing")
                    : `${t("checkout.placeOrder")} (AED ${total.toFixed(2)})`}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="checkout-right">
            <div className="summary">
              <h2>
                <FaBox /> {t("checkout.summary")}
              </h2>

              <ul>
                {itemsOfCart.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt="" />
                    <div>
                      <p>{item.name}</p>
                      <span>AED {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <b>{item.quantity}</b>
                  </li>
                ))}
              </ul>

              <div className="total">
                <p>{t("checkout.total")}</p>
                <b>AED {total.toFixed(2)}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
