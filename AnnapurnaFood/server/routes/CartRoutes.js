import express from "express";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
  getUserCart,
  clearCart,
} from "../controllers/CartController.js";

import { userVerification } from "../middleware/Authmiddleware.js";

const CartRouter = express.Router();

// ---------- User Cart Routes ----------
CartRouter.post("/add", userVerification, addToCart);              // Add food to cart
CartRouter.put("/update/:id", userVerification, updateCartItem);   // Update quantity or details
CartRouter.delete("/remove/:id", userVerification, removeFromCart); // Remove specific food
CartRouter.get("/", userVerification, getUserCart);                // Get user’s full cart
CartRouter.delete("/clear", userVerification, clearCart);          // Clear entire cart

export default router;
