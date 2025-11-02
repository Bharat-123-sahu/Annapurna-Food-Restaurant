import mongoose from "mongoose";

import { restaurentSchema } from "../schemas/RestaurentSchema";
export const RestaurentModel =mongoose.model("restaurent",restaurentSchema)