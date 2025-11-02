import mongoose from "mongoose";

import { adminSchema } from "../schemas/AdminSchema";
export const AdminModel = mongoose.model("cart", adminSchema);
