import mongoose from "mongoose";

import { cartSchema } from "../schemas/CartSchema.js";
export const CartModel = mongoose.model("cart", cartSchema);
