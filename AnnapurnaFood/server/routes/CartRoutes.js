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
// 1️⃣ Add item to cart (foodId from URL)
CartRouter.post("/add/:id", userVerification, addToCart);

// 2️⃣ Get full cart (user from token)
CartRouter.get("/", userVerification, getCart);

// 3️⃣ Update quantity (foodId & quantity from body)
CartRouter.patch("/updateqty/:id", userVerification, updateQuantity);

// 4️⃣ Remove specific item (foodId from body)
CartRouter.delete("/removeitem/:id", userVerification, removeItem);

// 5️⃣ Clear entire cart (user from token)
CartRouter.delete("/clear", userVerification, clearCart);
export default CartRouter;
