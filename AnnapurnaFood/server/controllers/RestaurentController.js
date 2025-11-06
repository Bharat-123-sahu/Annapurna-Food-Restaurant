// import { RestaurantModel } from "../models/Restaurantmodel.js";
import { RestaurentModel } from "../models/Restaurentmodel.js";
import { FoodModel } from "../models/Foodmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
/**
 * Add a new restaurant
 */
//we have

// addRestaurant
// getAllRestaurants
// getRestaurantById
// updateRestaurant
// deleteRestaurant
// getFoodsByRestaurant

export const createtoken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "3d" });
};

export const addRestaurant = async (req, res) => {
  try {
    const { name, password, email, address, phone, image, openingHours } =
      req.body;

    const ownerId = req.user._id;

    if (!name || !password || !email || !address || !phone || !ownerId) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled!" });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const restaurant = await RestaurentModel.create({
      name,
      email,
      address,
      phone,
      image,
      openingHours,
      ownerId: ownerId,
      password: hashpassword,
    });

    res
      .status(201)
      .json({ message: "Restaurant added successfully", restaurant });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ message: "Server Error while adding restaurant" });
  }
};

/**
 * Get all restaurants
 */
export const loginRestaurent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await RestaurentModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = createtoken(user._id); // Make sure you use user._id

    // Send cookie and response
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Only send over HTTPS
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return res.json({
      message: "Restaurant login successful",
      token,
      restaurant: {
        name: user.name,
        email: user.email,
        id: user._id, // corrected id field
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login error" });
  }
};
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurentModel.find();
    res.status(200).json({ restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res
      .status(500)
      .json({ message: "Server Error while fetching restaurants" });
  }
};

/**
 * Get a single restaurant by ID
 */
export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Server Error while fetching restaurant" });
  }
};

/**
 * Update restaurant details
 */
export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const restaurant = await RestaurentModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res
      .status(200)
      .json({ message: "Restaurant updated successfully", restaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Server Error while updating restaurant" });
  }
};

/**
 * Delete restaurant
 */
export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await RestaurentModel.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Optional: delete foods related to this restaurant
    await FoodModel.deleteMany({ restaurantId: id });

    res
      .status(200)
      .json({ message: "Restaurant and related foods deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Server Error while deleting restaurant" });
  }
};

/**
 * Get all foods by a specific restaurant
 */
export const getFoodsByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const foods = await FoodModel.find({ restaurant: id });

    if (foods.length === 0) {
      return res
        .status(404)
        .json({ message: "No foods found for this restaurant" });
    }

    res.status(200).json({ foods });
  } catch (error) {
    console.error("Error fetching foods by restaurant:", error);
    res.status(500).json({ message: "Server Error while fetching foods" });
  }
};
