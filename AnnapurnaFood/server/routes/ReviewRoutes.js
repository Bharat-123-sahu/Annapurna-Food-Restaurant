import express from "express";
import {
  addReview,
  getReviewsByUser,
  getReviewsByRestaurant,
  updateReview,
  deleteReview,
  getAllReviews,
} from "../controllers/ReviewController.js";

import { userVerification } from "../middleware/Authmiddleware.js";

const ReviewRouter = express.Router();

// ---------- Public Routes ----------
ReviewRouter.get("/:foodId", getReviewsByUser); // Get all reviews for a food
ReviewRouter.get("/restaurent/:restaurantId", getReviewsByRestaurant); // Get all reviews for a restaurant

// ---------- User Routes ----------
ReviewRouter.post("/add", userVerification, addReview); // Add a review
ReviewRouter.put("/update/:id", userVerification, updateReview); // Update user’s review
ReviewRouter.delete("/delete/:id", userVerification, deleteReview); // Delete user’s review
ReviewRouter.get("/user/all", userVerification, getAllReviews); // Get all reviews by logged-in user

export default ReviewRouter;
