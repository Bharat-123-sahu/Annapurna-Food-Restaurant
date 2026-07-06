import { CartModel } from "../models/Cartmodel.js";
import { FoodModel } from "../models/Foodmodel.js";

/*
We have:
1️⃣ Add item to cart
2️⃣ Get cart
3️⃣ Update quantity
4️⃣ Remove item
5️⃣ Clear cart
*/

// 1️⃣ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const foodId = req.params.id;
    const { quantity } = req.body;

    if (!quantity)
      return res.status(400).json({ message: "Quantity is required" });

    const foodItem = await FoodModel.findById(foodId);
    if (!foodItem)
      return res.status(404).json({ message: "Food item not found" });

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = new CartModel({
        user: userId,
        items: [
          {
            food: foodId,
            quantity: Number(quantity),
            price: Number(foodItem.price), // ⭐ FIXED
          },
        ],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.food.toString() === foodId
      );

      if (index > -1) {
        cart.items[index].quantity += Number(quantity);
      } else {
        cart.items.push({
          food: foodId,
          quantity: Number(quantity),
          price: Number(foodItem.price), // ⭐ FIXED
        });
      }
    }

    // ⭐ FIXED TOTAL PRICE CALCULATION
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    await cart.save();

    res.status(201).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("ADD TO CART ERROR:", error.message);
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// 2️⃣ Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await CartModel.findOne({ user: userId }).populate(
      "items.food"
    );

    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    res.json({
      items: cart.items,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// 3️⃣ Update item quantity
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;      // FIXED: get id from URL
    const { quantity } = req.body;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (quantity <= 0) {
      item.remove();
    } else {
      item.quantity = quantity;
    }

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    const updatecart = await CartModel.findOne({ user: userId }).populate(
      "items.food"
    );

    res.json({
      items: updatecart.items,
      totalPrice: updatecart.totalPrice,
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ error });
  }
};

// 4️⃣ Remove item from cart
export const removeItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;   // FIXED

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) =>
      item._id.toString() !== itemId.toString()
    );

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();

    const updatecart = await CartModel.findOne({ user: userId }).populate(
      "items.food"
    );

    res.json({
      items: updatecart.items,
      totalPrice: updatecart.totalPrice,
    });

  } catch (error) {
    console.error("REMOVE ITEM ERROR:", error);
    return res.status(500).json({ message: "Error removing item", error });
  }
};


// 5️⃣ Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
 const updatecart = await CartModel.findOne({ user: userId }).populate(
      "items.food"
    );
    res.json({ message: "Cart cleared", items:updatecart.items ,totalPrice:updatecart.totalPrice});
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};
