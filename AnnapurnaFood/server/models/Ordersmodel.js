import mongoose from "mongoose";

import { ordersSchema } from "../schemas/OrdersSchema.js";
export const OrderModel = mongoose.model("order", ordersSchema);
