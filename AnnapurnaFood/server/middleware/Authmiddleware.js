import jwt from "jsonwebtoken";
import { UserModel } from "../models/Usermodel.js";
import dotenv from "dotenv";

dotenv.config();

export const userVerification = async (req, res, next) => {
  try {
    let token;

    // 1. Read token from HTTP-only cookie
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // 2. OR from Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 3. If no token found at all
    else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // 5. Find user from DB
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found with this token" });
    }

    // 6. Attach user to request
    req.user = user;

    // 7. Continue
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
