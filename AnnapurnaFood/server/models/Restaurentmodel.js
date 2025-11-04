import mongoose from "mongoose";
import { restaurentSchema } from "../schemas/RestaurentSchema.js";

export const RestaurentModel = mongoose.model("restaurent", restaurentSchema);
