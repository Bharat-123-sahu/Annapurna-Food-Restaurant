import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} from "../controllers/OrderController.js";

import { userVerification } from "../middleware/Authmiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const OrderRouter = express.Router();

// ---------- User Routes ----------
OrderRouter.post("/create", userVerification, placeOrder);           // Place a new order
OrderRouter.get("/", userVerification, getUserOrders);               // Get all orders for logged-in user
OrderRouter.get("/:id", userVerification, getOrderById);             // Get single order details
OrderRouter.put("/cancel/:id", userVerification, cancelOrder);       // Cancel order

// ---------- Admin Routes ----------
OrderRouter.get("/all/orders", userVerification, isAdmin, getAllOrders); // Get all orders (admin)
OrderRouter.put("/update/:id", userVerification, isAdmin, updateOrderStatus); // Update order status (pending → delivered)

export default OrderRouter;
