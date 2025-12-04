// src/context/CartContext.jsx
import React, { createContext, useState, useCallback } from "react";
import api from "../apis/axiosconfigs";

// Create Context
export const CartContext = createContext({
  cart: [],
  total: 0,
  loading: false,
  fetchCart: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1️⃣ GET USER CART
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart", { withCredentials: true });

      console.log("GET /cart RESPONSE:", res.data);
      console.log("SETTING CART ITEMS TO:", res.data.items);

      setCart(res.data.items ?? []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2️⃣ ADD TO CART
  const addToCart = async (foodId, quantity = 1) => {
    try {
      const res = await api.post(
        `/cart/add/${foodId}`,
        { quantity },
        { withCredentials: true }
      );

      setCart(res.data?.cart?.items);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // 3️⃣ UPDATE QUANTITY=================
  const updateQuantity = async (itemId, quantity) => {
  try {
    const res = await api.patch(
      `/cart/updateqty/${itemId}`,
      { quantity },
      { withCredentials: true }
    );

    setCart(res.data.items ?? []);
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
};

  // 4️⃣ REMOVE ITEM
 const removeItem = async (itemId) => {
  try {
    const res = await api.delete(`/cart/removeitem/${itemId}`, {
      withCredentials: true,
    });

    setCart(res.data?.items ?? []);
  } catch (err) {
    console.error("Error removing item:", err);
  }
};

  // 5️⃣ CLEAR CART
  const clearCart = async () => {
    try {
      const res = await api.delete("/cart/clear", {
        withCredentials: true,
      });
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // 6️⃣ TOTAL PRICE
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 7️⃣ CONTEXT VALUE
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
