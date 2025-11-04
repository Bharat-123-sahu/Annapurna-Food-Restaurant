import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import AdminRouter from "./routes/AdminRouter.js";
import CartRouter from "./routes/CartRoutes.js";
import OrderRouter from "./routes/OrderRoutes.js";
import FoodRouter from "./routes/FoodRoutes.js";
import RestaurentRouter from "./routes/RestaurentRoutes.js";
import ReviewRouter from "./routes/ReviewRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
const app = express();
app.use(express.json());
config();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/admin", AdminRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);
app.use("/food", FoodRouter);
app.use("/restaurent", RestaurentRouter);
app.use("/review", ReviewRouter);
app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`app runntin on this port ${process.env.PORT} `);
  mongoose.connect(process.env.MONGO_URI);
  console.log("connect database successfully");
});
