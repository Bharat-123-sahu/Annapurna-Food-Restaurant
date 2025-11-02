import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUserOrders,
  logoutUser,
} from "../controllers/UserController.js";

import { userVerification } from "../middleware/Authmiddleware.js";

const UserRouter = express.Router();

// ---------- Auth ----------
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/logout", logoutUser);

// ---------- Profile ----------
UserRouter.get("/profile", userVerification, getUserProfile);
UserRouter.put("/profile", userVerification, updateUserProfile);
UserRouter.delete("/delete", userVerification, deleteUserAccount);

// ---------- Orders ----------
UserRouter.get("/orders", userVerification, getUserOrders);

export default UserRouter;
