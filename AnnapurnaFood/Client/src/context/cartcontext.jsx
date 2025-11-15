// src/context/CartContext.jsx
import React, { createContext, useState, useCallback, useEffect } from "react";
import api from "../apis/axiosconfigs"; // Axios instance (with baseURL)

// ✅ Create Context
export const CartContext = createContext({
  cart: [],
  total: 0,
  loading: false,
  fetchCart: () => {},
  addToCart: (foodId, quantity) => {},
  updateQuantity: (cartItemId, quantity) => {},
  removeItem: (cartItemId) => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- GET CART ----------
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart")//, { withCredentials: true });
      const cartItems = res?.data?.cart ?? [];
      setCart(Array.isArray(cartItems) ? cartItems : []);
    } catch (err) {
      console.log("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- ADD TO CART ----------
  const addToCart = async (foodId, quantity = 1) => {
    try {
      const res = await api.post(
        "/cart/add",
        { foodId, quantity },
        { withCredentials: true }
      );
      setCart(res?.data?.cart ?? []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ---------- UPDATE QUANTITY ----------
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await api.put(
        `/cart/updateqty/${cartItemId}`,
        { quantity },
        { withCredentials: true }
      );
      setCart(res?.data?.cart ?? []);
    } catch (err) {
      console.error("Error updating cart quantity:", err);
    }
  };

  // ---------- REMOVE ITEM ----------
  const removeItem = async (cartItemId) => {
    try {
      const res = await api.delete(`/cart/removeitem/${cartItemId}`, {
        withCredentials: true,
      });
      setCart(res?.data?.cart ?? []);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ---------- CLEAR CART ----------
  const clearCart = async () => {
    try {
      const res = await api.delete("/cart/clear", { withCredentials: true });
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // ---------- CALCULATE TOTAL ----------
  const total = cart.reduce(
    (acc, item) => acc + item.foodId?.price * item.quantity,
    0
  );

  // ---------- AUTO FETCH ON LOAD ----------
  // useEffect(() => {
  //   fetchCart();
  // }, [fetchCart]);

  // ---------- CONTEXT VALUE ----------
  const value = {
    cart,
    total,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
