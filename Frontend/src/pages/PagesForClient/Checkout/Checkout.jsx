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

export const Checkout = () => {
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

  // ❗ errors state
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

    // حذف الخطأ عند الكتابة
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "Name is required";
    } else if (formData.customer_name.length < 3) {
      newErrors.customer_name = "Minimum 3 characters";
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = "Phone is required";
    } else if (!/^\d{7,15}$/.test(formData.customer_phone)) {
      newErrors.customer_phone = "Invalid phone number";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.building_number) {
      newErrors.building_number = "Building number required";
    } else if (Number(formData.building_number) <= 0) {
      newErrors.building_number = "Invalid number";
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
              <FaArrowLeft /> Back to shopping
            </Link>

            <div className="checkout-card">
              <div className="checkout-header">
                <div>
                  <h1>Checkout</h1>
                  <p>Enter your delivery details</p>
                </div>
                <FaMapMarkerAlt />
              </div>

              <form onSubmit={handleSubmit} className="form">
                {/* Contact */}
                <h2>Contact Info</h2>

                <div className="input-group">
                  <label>Full Name *</label>
                  <input
                    name="customer_name"
                    placeholder="John Doe"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className={errors.customer_name ? "input-error" : ""}
                  />
                  {errors.customer_name && (
                    <span className="error">{errors.customer_name}</span>
                  )}
                </div>

                <div className="input-group">
                  <label>Phone *</label>
                  <div className="phone">
                    <span>+971</span>
                    <input
                      name="customer_phone"
                      placeholder="501234567"
                      value={formData.customer_phone}
                      onChange={handleChange}
                      className={errors.customer_phone ? "input-error" : ""}
                    />
                  </div>
                  {errors.customer_phone && (
                    <span className="error">{errors.customer_phone}</span>
                  )}
                </div>

                {/* Address */}
                <h2>Delivery Address</h2>

                <div className="input-group">
                  <label>City</label>
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
                  <label>Area *</label>
                  <input
                    name="area"
                    placeholder="e.g. Marina"
                    value={formData.area}
                    onChange={handleChange}
                    className={errors.area ? "input-error" : ""}
                  />
                  {errors.area && <span className="error">{errors.area}</span>}
                </div>

                <div className="input-group">
                  <label>Street</label>
                  <input
                    name="street"
                    placeholder="Street name"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Building Number *</label>
                  <input
                    type="number"
                    name="building_number"
                    placeholder="e.g. 12"
                    value={formData.building_number}
                    onChange={handleChange}
                    className={errors.building_number ? "input-error" : ""}
                  />
                  {errors.building_number && (
                    <span className="error">{errors.building_number}</span>
                  )}
                </div>

                <div className="input-group">
                  <label>Notes</label>
                  <textarea
                    name="delivery_notes"
                    placeholder="Optional notes..."
                    value={formData.delivery_notes}
                    onChange={handleChange}
                  />
                </div>

                {/* Payment */}
                <h2>Payment</h2>

                <div className="payment">
                  <FaCreditCard />
                  <div>
                    <h4>Cash on Delivery</h4>
                    <p>Pay when you receive</p>
                  </div>
                  <FaShieldAlt />
                </div>

                <button disabled={isSubmitting} className="submit-btn">
                  {isSubmitting
                    ? "Processing..."
                    : `Place Order (AED ${total.toFixed(2)})`}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="checkout-right">
            <div className="summary">
              <h2>
                <FaBox /> Order Summary
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
                <p>Total</p>
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
