import express from "express";
import Upload from "../utils/multer.js";
import {
  addRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  loginRestaurent,
  getFoodsByRestaurant,
  logoutReastaurant,
  // getFoodsByRestaurant
} from "../controllers/RestaurentController.js";

import { userVerification } from "../middleware/Authmiddleware.js";
import { isAdmin } from "../middleware/isAdminmiddleware.js";
import { RestaurantVerification } from "../middleware/isrestaurentmiddleware.js";

const RestaurentRouter = express.Router();

// ---------- Public Routes ----------
RestaurentRouter.get("/", getAllRestaurants); // Get all restaurants
RestaurentRouter.post("/logout", RestaurantVerification, logoutReastaurant); // Logoutrestaurant
RestaurentRouter.get("/resstaurantfood/:id", getFoodsByRestaurant); // Get all foods of a restaurant
RestaurentRouter.post("/login", loginRestaurent); //
//add food by restaurent

// ---------- Admin Routes ----------
RestaurentRouter.post(
  "/register",
  Upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "poster", maxCount: 1 },
  ]),

  addRestaurant
); // Add new restaurant
RestaurentRouter.patch(
  "/update/:id",
  RestaurantVerification,
  Upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "poster", maxCount: 1 },
  ]),
  updateRestaurant
);
// Update restaurant info
RestaurentRouter.delete(
  "/delete/:id",
  RestaurantVerification,
  deleteRestaurant
); // Delete a restaurant
RestaurentRouter.get("/:id", getRestaurantById); // Get one restaurant by ID

export default RestaurentRouter;
