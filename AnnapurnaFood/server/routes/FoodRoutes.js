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
import { RestaurantVerification } from "../middleware/isrestaurentmiddleware.js";

const FoodRouter = express.Router();

// ---------- Public Routes ----------
FoodRouter.get("/", getAllFood);
FoodRouter.get("/:id", getFoodById);
FoodRouter.get("/:category", getFoodByCategory);
FoodRouter.get("/restaurant/:restaurantId", getFoodByRestaurant);
FoodRouter.put("/update/available",RestaurantVerification, updateFoodAvailability);

// ---------- Admin Routes ----------
FoodRouter.post("/add/:id", RestaurantVerification , addFood);
FoodRouter.put("/update/:id", RestaurantVerification, updateFood);
FoodRouter.delete("/delete/:id",  RestaurantVerification, deleteFood);

export default FoodRouter;
