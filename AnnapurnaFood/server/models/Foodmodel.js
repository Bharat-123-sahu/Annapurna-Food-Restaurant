import mongoose from "mongoose";

import { foodSchema } from "../schemas/FoodSchema";
export const FoodModel =mongoose.model("food",foodSchema)