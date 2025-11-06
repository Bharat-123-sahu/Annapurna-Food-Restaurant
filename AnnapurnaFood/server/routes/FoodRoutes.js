import express from "express";
import {
  addFood,
  getAllFood,
  getFoodById,
  updateFood,
  deleteFood,
  getFoodByCategory,
  getFoodByRestaurant,
  updateFoodAvailability,
} from "../controllers/FoodController.js";

import { userVerification } from "../middleware/Authmiddleware.js";
import { isAdmin } from "../middleware/isAdminmiddleware.js"; // optional - if only admin can manage food

const FoodRouter = express.Router();

// ---------- Public Routes ----------
FoodRouter.get("/", getAllFood);
FoodRouter.get("/:id", getFoodById);
FoodRouter.get("/:category", getFoodByCategory);
FoodRouter.get("/restaurant/:restaurantId", getFoodByRestaurant);
FoodRouter.put("/update/available", updateFoodAvailability);

// ---------- Admin Routes ----------
FoodRouter.post("/add/:id", userVerification, isAdmin, addFood);
FoodRouter.put("/update/:id", userVerification, isAdmin, updateFood);
FoodRouter.delete("/delete/:id", userVerification, isAdmin, deleteFood);

export default FoodRouter;
