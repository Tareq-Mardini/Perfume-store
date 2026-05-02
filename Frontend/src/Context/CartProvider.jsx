import { useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import { useLanguage } from "../Context/LanguageContext";

export const CartProvider = ({ children }) => {
  const { language } = useLanguage();
  // 🟢 state
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (product) => {
    setItems((prev) => {
      let updatedItems;

      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        updatedItems = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [...prev, { ...product, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedItems));
      language == "ar"
        ? toast.success("تم اضافة المنتج بنجاح")
        : toast.success("The product has been added successfully");

      return updatedItems;
    });

    setIsCartOpen(true);
  };

  const removeItem = (id) => {
    setItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);

      localStorage.setItem("cart", JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) => {
      let updatedItems;

      if (quantity < 1) {
        updatedItems = prev.filter((item) => item.id !== id);
      } else {
        updatedItems = prev.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        isCartOpen,
        setIsCartOpen,
        setItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
