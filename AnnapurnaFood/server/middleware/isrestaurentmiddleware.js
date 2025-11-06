import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RestaurentModel } from "../models/Restaurentmodel.js";

dotenv.config();

// Restaurant verification middleware
export const RestaurantVerification = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);

      // 4. Find the restaurant by decoded ID
      const restaurant = await RestaurentModel.findById(decoded.id).select(
        "-password"
      );

      if (!restaurant) {
        return res
          .status(401)
          .json({ message: "Restaurant not found with this token" });
      }

      // 5. Attach restaurant to request
      req.restaurant = restaurant;

      // 6. Proceed to next middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // 7. No token provided
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
