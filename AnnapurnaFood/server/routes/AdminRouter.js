import express from "express";
import {
  registerAdmin,
  loginAdmin,
  verifyAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getAllRestaurants,
  updateRestaurantStatus,
  logoutAdmin,
  getAllUsers,
  deleteRestaurant,
} from "../controllers/AdminController.js";
//1.addadmin,2.updaterestaurent,3.login admin ,4.verifyadmin,5.get all admin,6.update admin,7.delete admin,8.getall restaurent,9.logout admin

import { isAdmin } from "../middleware/isAdminmiddleware.js";
import { userVerification } from "../middleware/Authmiddleware.js";

const AdminRouter = express.Router();

// ---------- Auth ----------
AdminRouter.post("/register", registerAdmin);
AdminRouter.post("/login", loginAdmin);
AdminRouter.get("/", getAllAdmins);
AdminRouter.delete("/delete", deleteAdmin);

// ---------- Dashboard ----------
AdminRouter.get("/dashboard", isAdmin, verifyAdmin);

// ---------- Manage Users ----------
AdminRouter.get("/allusers", userVerification, getAllUsers);
// AdminRouter.delete("/user/:id", userVerification, deleteUsers);

// ---------- Manage Restaurants ----------
AdminRouter.get("/restaurants", userVerification, getAllRestaurants);
AdminRouter.delete("/restaurant/:id", userVerification, deleteRestaurant);

// ---------- Manage Orders ----------
//  AdminRouter.get("/orders", userVerification, getAllOrders);
// AdminRouter.delete("/order/:id", userVerification, deleteOrder);
AdminRouter.patch("/update", updateAdmin);
AdminRouter.patch("/restaurent/status", updateRestaurantStatus);

AdminRouter.get("/logout", logoutAdmin);
export default AdminRouter;
