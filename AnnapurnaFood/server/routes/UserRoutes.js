import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/UserController.js";

import { userVerification } from "../middleware/Authmiddleware.js";

const UserRouter = express.Router();

// ---------- Auth ----------
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/logout", logoutUser);

// ---------- Profile ----------
UserRouter.get("/profile", userVerification, getUserProfile);
UserRouter.put("/profile/update", userVerification, updateUserProfile);
// UserRouter.delete("/profile/delete", userVerification, deleteUserAccount);

// ---------- Orders ----------
// UserRouter.get("/orders", userVerification, getUserOrders);
UserRouter.get(
  "/profile/change-password",
  userVerification,
  changePassword
);

export default UserRouter;
