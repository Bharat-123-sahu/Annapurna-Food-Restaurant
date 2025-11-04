import mongoose from "mongoose";

import { reviewSchema } from "../schemas/ReviewSchema.js";
export const ReviewModel =mongoose.model("review",reviewSchema)