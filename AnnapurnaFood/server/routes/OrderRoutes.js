import express from "express";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getOrderById,
  cancelOrder,
  deleteOrder,
} from "../controllers/OrderController.js";

import { userVerification } from "../middleware/Authmiddleware.js";
import { isAdmin } from "../middleware/isAdminmiddleware.js";

const OrderRouter = express.Router();

// ---------- User Routes ----------
OrderRouter.post("/add", userVerification, createOrder); // Place a new order
OrderRouter.get("/", userVerification, getUserOrders); // Get all orders for logged-in user
OrderRouter.get("/byId/:id", userVerification, getOrderById); // Get single order details
OrderRouter.put("/cancel/:id", userVerification, cancelOrder); // Cancel order
OrderRouter.put("/delete/:id", userVerification, deleteOrder); // Cancel order

// ---------- Admin Routes ----------
OrderRouter.get("/all-orders", userVerification, getAllOrders); // Get all orders (admin)
OrderRouter.put(
  "/status/:id",
  userVerification,
  isAdmin,
  updateOrderStatus
); // Update order status (pending → delivered)
OrderRouter.put(
  "/paymentstatus/:id",
  userVerification,
  isAdmin,
  updatePaymentStatus
); // Update order status (pending → delivered)

export default OrderRouter;
