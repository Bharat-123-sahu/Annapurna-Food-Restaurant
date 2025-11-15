import mongoose from "mongoose";
export const restaurentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerName: String,
  email: String,
  phone: String,
  cuisine:String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
  },

  logo: String,
  rating: { type: Number, default: 4.0 },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  isOpen: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
  password: String,
});
