import mongoose from "mongoose";

import { adminSchema } from "../schemas/AdminSchema.js";
export const AdminModel = mongoose.model("admin", adminSchema);
