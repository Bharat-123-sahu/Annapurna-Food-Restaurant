import mongoose from "mongoose";

import { reviewSchema } from "../schemas/ReviewSchema";
export const ReviewModel =mongoose.model("Cart",reviewSchema)