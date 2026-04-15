import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import "./CartSidebar.css";
import { useCart } from "../../hooks/useCart";
import { useEffect } from "react";

export const CartSidebar = ({ isOpen, setIsOpen }) => {
  const { items, total, removeItem, updateQuantity, setIsCartOpen } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <div style={{ zIndex: 1222222222 }} className="cart-sidebar">
        <div className="cart-header" style={{ paddingBottom: "21px" }}>
          <h2>
            <FaShoppingBag /> Your Cart
          </h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <IoClose />
          </button>
        </div>
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <FaShoppingBag className="empty-icon" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h3>{item.name}</h3>
                      <p>AED {item.price * item.quantity}</p>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity">
                        <button
                          disabled={item.quantity == 1}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        className="delete-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <p>Total</p>
              <p>AED {total.toFixed(2)}</p>
            </div>
            <Link to="/products/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
