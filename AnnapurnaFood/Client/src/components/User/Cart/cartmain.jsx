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
  const { fetchCart, cart, loading, total } = useContext(CartContext);

  // const [cartitems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Margherita Pizza",
  //     price: 249,
  //     quantity: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1601924582975-7e1d99c0a3c4?auto=format&fit=crop&w=800&q=80",
  //   },
  //   {
  //     id: 2,
  //     name: "Chicken Burger",
  //     price: 199,
  //     quantity: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1606755962773-0c8f1d1074bc?auto=format&fit=crop&w=800&q=80",
  //   },
  // ]);
  //insert the total😤
  // // ✅ Fetch all foods on mount
  useEffect(() => {
    fetchCart(); // fetch only once
  }, []);

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
  if (!cart || cart.length === 0)
    return <h5 className="text-center text-muted my-5">Add food items 😞</h5>;

  // ✅ Render all foods
  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4 text-center">your Cart 🍝</h3>

      <div className="row g-4">
        {cart.map((cat) => (
          <div key={cat._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <CartItemCard item={cat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartMain;
