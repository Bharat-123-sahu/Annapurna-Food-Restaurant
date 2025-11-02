import mongoose from "mongoose";

import { cartSchema } from "../schemas/CartSchema";
export const CartModel =mongoose.model("cart",cartSchema)