import mongoose from "mongoose";

export const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "restaurantadmin"],
    default: "restaurantadmin", // Default admin for a specific restaurant
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AdminModel = mongoose.model("Admin", adminSchema);
