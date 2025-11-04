import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
} from "../controllers/CartController.js";

import { userVerification } from "../middleware/Authmiddleware.js";

const CartRouter = express.Router();

// ---------- User Cart Routes ----------
CartRouter.post("/add", userVerification, addToCart); // Add food to cart
CartRouter.put("/updateqty/:id", userVerification, updateQuantity); // Update quantity or details
CartRouter.delete("/removeitem/:id", userVerification, removeItem); // Remove specific food
CartRouter.get("/", userVerification, getCart); // Get user’s full cart
CartRouter.delete("/clear", userVerification, clearCart); // Clear entire cart

export default CartRouter;
