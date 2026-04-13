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

export const Checkout = () => {
  const navigate = useNavigate();

  const [itemsOfCart, setitemsOfCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "Dubai",
    area: "",
    street: "",
    building: "",
    notes: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ جلب الكارت من localStorage
  useEffect(() => {
    const cart = items;
    setitemsOfCart(cart);

    if (cart.length === 0) {
      navigate("/products");
    }
  }, [items]);

  // 💰 حساب التوتال
  const total = itemsOfCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // ✏️ تغيير الفورم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 ارسال الطلب
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.removeItem("cart");
      navigate("/success");
    }, 1500);
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

                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <div className="phone">
                  <span>+971</span>
                  <input
                    name="phone"
                    placeholder="50 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <h2>Delivery Address</h2>

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                  <option>Sharjah</option>
                </select>

                <input
                  name="area"
                  placeholder="Area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />

                <input
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                />

                <input
                  name="building"
                  placeholder="Building"
                  value={formData.building}
                  onChange={handleChange}
                />

                <textarea
                  name="notes"
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                />

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
