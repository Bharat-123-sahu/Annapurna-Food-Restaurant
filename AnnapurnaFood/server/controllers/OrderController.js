import { OrderModel } from "../models/Ordermodel.js";
import { CartModel } from "../models/Cartmodel.js";
import { UserModel } from "../models/Usermodel.js";
import { RestaurantModel } from "../models/Restaurantmodel.js";
import { FoodModel } from "../models/Food.js";

//  1️⃣ Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userId, deliveryAddress, paymentMethod } = req.body;

    const cart = await CartModel.findOne({ user: userId }).populate("items.food");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Calculate total
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.food.price * item.quantity,
      0
    );

    // Create order
    const newOrder = new OrderModel({
      user: userId,
      items: cart.items.map((item) => ({
        food: item.food._id,
        quantity: item.quantity,
        price: item.food.price,
      })),
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
      orderStatus: "placed",
    });

    await newOrder.save();

    // Empty user cart after placing order
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

//  2️⃣ Get all orders (Admin or Superadmin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("items.food", "name price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

//  3️⃣ Get user’s orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ user: userId })
      .populate("items.food", "name price image")
      .sort({ createdAt: -1 });

    if (orders.length === 0)
      return res.status(404).json({ message: "No orders found for this user" });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};

//  4️⃣ Update order status (Admin / Restaurant)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      message: `Order status updated to ${orderStatus}`,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};

//  5️⃣ Update payment status (Admin / Restaurant)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({
      message: `Payment status updated to ${paymentStatus}`,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error });
  }
};

//  6️⃣ Get single order details
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId)
      .populate("user", "name email")
      .populate("items.food", "name price image");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

//  7️⃣ Cancel order (User)
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus !== "placed")
      return res
        .status(400)
        .json({ message: "Only newly placed orders can be canceled" });

    order.orderStatus = "canceled";
    await order.save();

    res.json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error canceling order", error });
  }
};

//  8️⃣ Delete order (Admin only)
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
