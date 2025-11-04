import { ReviewModel } from "../models/Reviewmodel.js";
import { RestaurentModel } from "../models/Restaurentmodel.js";
import { UserModel } from "../models/Usermodel.js";
//we have

// addReview
// getAllReviews
// getReviewsByRestaurant
// getReviewsByUser
// updateReview
// deleteReview

//new review
export const addReview = async (req, res) => {
  try {
    const { userId, restaurantId, rating, comment } = req.body;

    if (!userId || !restaurantId || !rating) {
      return res
        .status(400)
        .json({ message: "User ID, Restaurant ID, and Rating are required!" });
    }

    // Optional: check if user already reviewed the same restaurant
    const existingReview = await ReviewModel.findOne({ userId, restaurantId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this restaurant." });
    }

    const review = await ReviewModel.create({
      userId,
      restaurantId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error while adding review" });
  }
};

//  Get all reviews

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .populate("userId", "name email")
      .populate("restaurantId", "name");

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

//   Get all reviews for a specific restaurant

export const getReviewsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const reviews = await ReviewModel.find({ restaurantId }).populate(
      "userId",
      "name email"
    );

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this restaurant" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching restaurant reviews:", error);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

//  Get all reviews by a specific user

export const getReviewsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await ReviewModel.find({ userId }).populate(
      "restaurant",
      "name"
    );

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user reviews" });
  }
};

//   Update a review

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const review = await ReviewModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error while updating review" });
  }
};

//   Delete a review

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await ReviewModel.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error while deleting review" });
  }
};
