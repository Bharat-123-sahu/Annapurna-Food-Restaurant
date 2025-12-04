// src/components/user/Menu/MenuSection.jsx
import React, { useContext, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { CartContext } from "../../../context/cartcontext";
import CartItemCard from "./CartItemCard";
// const foods = [
//   { _id: 1, name: "Pizza", price: 250, image: "https://images.unsplash.com/photo-1761839257664-ecba169506c1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600" },
//   { _id: 2, name: "Burger", price: 180, image: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600" },
// ];
const CartMain = () => {
  // ✅ Access context values
  const { fetchCart, total, cart, loading, updateQuantity, removeItem } =
    useContext(CartContext);
  const [loginReady, setLoginReady] = useState(false);

  // Step 1: Load token
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoginReady(true);
    }
  }, []);

  // Step 2: Fetch cart ONLY when token is ready
  useEffect(() => {
    if (!loginReady) return;
    fetchCart();
  }, [loginReady]);

  const handleQuantityChange = (itemId, qty) => {
    // call context function (must exist)
    updateQuantity(itemId, qty);
  };

  const handleRemove = (itemId) => {
    removeItem(itemId);
  };
  // ✅ Loader
  if (loading)
    return (
      <Box
        className="d-flex justify-content-center align-items-center"
        sx={{ height: "50vh" }}
      >
        <CircularProgress sx={{ color: "#FF6A00" }} />
      </Box>
    );

  // ✅ Empty state
  if (cart.length === 0)
    return <h5 className="text-center text-muted my-5">Add food items 😞</h5>;

  // ✅ Render all foods
  return (
    <div className="container mt-4">
      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <CartItemCard
              key={item._id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}

          <div style={{ textAlign: "right", marginTop: 16 }}>
            <strong>Total: ₹{total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default CartMain;
