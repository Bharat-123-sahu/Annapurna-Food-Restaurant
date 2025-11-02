import { CartModel } from "../models/Cartmodel.js";
import { FoodModel } from "../models/Foodmodel.js";

//  1️⃣ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    if (!userId || !foodId || !quantity)
      return res.status(400).json({ message: "Missing required fields" });

    // Check food exists
    const foodItem = await FoodModel.findById(foodId);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });

    // Check if item already in cart
    let cart = await CartModel.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.food.toString() === foodId
      );

      if (itemIndex > -1) {
        // Item already in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          food: foodId,
          quantity,
          price: foodItem.price,
        });
      }
    } else {
      // Create new cart
      cart = new CartModel({
        user: userId,
        items: [
          {
            food: foodId,
            quantity,
            price: foodItem.price,
          },
        ],
      });
    }

    // Calculate total price
    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

//  2️⃣ Get user cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await CartModel.findOne({ user: userId }).populate(
      "items.food"
    );

    if (!cart)
      return res.status(404).json({ message: "Cart not found for this user" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

//  3️⃣ Update item quantity
export const updateQuantity = async (req, res) => {
  try {
    const { userId, foodId, quantity } = req.body;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart)
      return res.status(404).json({ message: "Cart not found for this user" });

    const item = cart.items.find(
      (item) => item.food.toString() === foodId.toString()
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json({ message: "Quantity updated successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
};

//  4️⃣ Remove single item from cart
export const removeItem = async (req, res) => {
  try {
    const { userId, foodId } = req.body;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart)
      return res.status(404).json({ message: "Cart not found for this user" });

    cart.items = cart.items.filter(
      (item) => item.food.toString() !== foodId.toString()
    );

    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    res.json({ message: "Item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

//  5️⃣ Clear cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart)
      return res.status(404).json({ message: "Cart not found for this user" });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
