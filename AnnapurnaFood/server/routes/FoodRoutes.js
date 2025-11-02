import express from "express";
import {
  createFoodItem,
  getAllFoods,
  getFoodById,
  updateFoodItem,
  deleteFoodItem,
  getFoodsByCategory,
  getFoodsByRestaurant,
} from "../controllers/FoodController.js";

import { userVerification } from "../middleware/Authmiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js"; // optional - if only admin can manage food

const FoodRouter = express.Router();

// ---------- Public Routes ----------
FoodRouter.get("/", getAllFoods);
FoodRouter.get("/:id", getFoodById);
FoodRouter.get("/category/:category", getFoodsByCategory);
FoodRouter.get("/restaurant/:restaurantId", getFoodsByRestaurant);

// ---------- Admin Routes ----------
FoodRouter.post("/create", userVerification, isAdmin, createFoodItem);
FoodRouter.put("/update/:id", userVerification, isAdmin, updateFoodItem);
FoodRouter.delete("/delete/:id", userVerification, isAdmin, deleteFoodItem);

export default FoodRouter;
