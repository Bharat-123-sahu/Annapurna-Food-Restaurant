import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  loginRestaurent,
  getFoodsByRestaurant
  // getFoodsByRestaurant
} from "../controllers/RestaurentController.js";

import { userVerification } from "../middleware/Authmiddleware.js";
import { isAdmin } from "../middleware/isAdminmiddleware.js";

const RestaurentRouter = express.Router();

// ---------- Public Routes ----------
RestaurentRouter.get("/", getAllRestaurants); // Get all restaurants
RestaurentRouter.get("/:id", getRestaurantById); // Get one restaurant by ID
RestaurentRouter.get("/food/:id",userVerification, getFoodsByRestaurant); // Get all foods of a restaurant
RestaurentRouter.get("/login",userVerification, loginRestaurent); // 


// ---------- Admin Routes ----------
RestaurentRouter.post(
  "/register",
  userVerification,
  isAdmin,
  addRestaurant
); // Add new restaurant
RestaurentRouter.put(
  "/update/:id",
  userVerification,
  isAdmin,
  updateRestaurant
); // Update restaurant info
RestaurentRouter.delete(
  "/delete/:id",
  userVerification,
  isAdmin,
  deleteRestaurant
); // Delete a restaurant

export default RestaurentRouter;
