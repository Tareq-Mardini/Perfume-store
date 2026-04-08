import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export const useCart = () => {
  return useContext(CartContext);
};