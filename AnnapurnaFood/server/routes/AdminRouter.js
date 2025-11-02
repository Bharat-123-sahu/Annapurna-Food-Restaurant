import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllUsers,
  getAllRestaurants,
  getAllOrders,
  getDashboardStats,
  deleteUser,
  deleteRestaurant,
  deleteOrder,
} from "../controllers/AdminController.js";

import { userVerification } from "../middleware/Authmiddleware.js";

const AdminRouter = express.Router();

// ---------- Auth ----------
AdminRouter.post("/register", registerAdmin);
AdminRouter.post("/login", loginAdmin);

// ---------- Dashboard ----------
AdminRouter.get("/dashboard", userVerification, getDashboardStats);

// ---------- Manage Users ----------
AdminRouter.get("/users", userVerification, getAllUsers);
AdminRouter.delete("/user/:id", userVerification, deleteUser);

// ---------- Manage Restaurants ----------
AdminRouter.get("/restaurants", userVerification, getAllRestaurants);
AdminRouter.delete("/restaurant/:id", userVerification, deleteRestaurant);

// ---------- Manage Orders ----------
AdminRouter.get("/orders", userVerification, getAllOrders);
AdminRouter.delete("/order/:id", userVerification, deleteOrder);

export default AdminRouter;
