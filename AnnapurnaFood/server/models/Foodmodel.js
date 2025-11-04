import mongoose from "mongoose";

import { foodSchema } from "../schemas/FoodSchema.js";
export const FoodModel =mongoose.model("food",foodSchema)