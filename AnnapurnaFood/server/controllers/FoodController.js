import { FoodModel } from "../models/Foodmodel.js";
import { RestaurantModel } from "../models/Restaurantmodel.js";

//  1️⃣ Add new food item (Admin / RestaurantAdmin)
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category, restaurantId, image, tags } =
      req.body;

    if (!name || !price || !category || !restaurantId)
      return res.status(400).json({ message: "Required fields missing" });

    // Check restaurant exists
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const newFood = new FoodModel({
      name,
      description,
      price,
      category,
      restaurant: restaurantId,
      image,
      tags,
    });

    await newFood.save();

    // Optionally add food to restaurant menu
    restaurant.menu.push(newFood._id);
    await restaurant.save();

    res.status(201).json({ message: "Food added successfully", food: newFood });
  } catch (error) {
    res.status(500).json({ message: "Error adding food", error });
  }
};

//  2️⃣ Get all food items
export const getAllFood = async (req, res) => {
  try {
    const foods = await FoodModel.find().populate("restaurant");
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods", error });
  }
};

//  3️⃣ Get food by ID
export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id).populate("restaurant");

    if (!food) return res.status(404).json({ message: "Food not found" });

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food", error });
  }
};

// ✅ 4️⃣ Update food item
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, isAvailable, tags } =
      req.body;

    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      { name, description, price, category, image, isAvailable, tags },
      { new: true }
    );

    if (!updatedFood)
      return res.status(404).json({ message: "Food not found" });

    res.json({ message: "Food updated successfully", food: updatedFood });
  } catch (error) {
    res.status(500).json({ message: "Error updating food", error });
  }
};

// ✅ 5️⃣ Delete food item
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await FoodModel.findByIdAndDelete(id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // Remove from restaurant menu
    await RestaurantModel.findByIdAndUpdate(food.restaurant, {
      $pull: { menu: food._id },
    });

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food", error });
  }
};

// ✅ 6️⃣ Get food by category
export const getFoodByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await FoodModel.find({ category }).populate("restaurant");

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods by category", error });
  }
};

// ✅ 7️⃣ Get food by restaurant
export const getFoodByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foods = await FoodModel.find({ restaurant: restaurantId }).populate(
      "restaurant"
    );

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods by restaurant", error });
  }
};

// ✅ 8️⃣ Update food availability
export const updateFoodAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const food = await FoodModel.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );

    if (!food) return res.status(404).json({ message: "Food not found" });

    res.json({ message: "Food availability updated", food });
  } catch (error) {
    res.status(500).json({ message: "Error updating availability", error });
  }
};
