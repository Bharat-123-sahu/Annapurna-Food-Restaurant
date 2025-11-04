import mongoose from "mongoose";


export const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Example: "Cheese Pizza"
  },
  description: {
    type: String,
    required: true, // Example: "Delicious cheese burst pizza with oregano"
  },
  image: {
    type: String,
    required: true, // Example: image URL (Cloudinary, Firebase, etc.)
  },
  price: {
    type: Number,
    required: true, // Example: 249
  },
  category: {
    type: String,
    required: true, // Example: "Pizza" or "Burger"
  },
  rating: {
    type: Number,
    default: 4.5, // Example: average rating (0–5)
  },
  isAvailable: {
    type: Boolean,
    default: true, // Show/hide out of stock items
  },
  restaurant: {
   type: mongoose.Schema.Types.ObjectId,ref:"restaurent" ,required:true   // Example: "Domino’s Pizza"
  },
  tags: [
    {
      type: String, // Example: "Spicy", "Veg", "Cheesy"
    },
  ],
  // author:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:'restaurent'
  // },
  createdAt: {
    type: Date,
    default: Date.now, // Auto timestamp
  },
});
