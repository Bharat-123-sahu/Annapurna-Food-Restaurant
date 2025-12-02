import jwt from "jsonwebtoken";
import { UserModel } from "../models/Usermodel.js"; // <-- MODEL KO BADLEIN!
import dotenv from "dotenv";

dotenv.config();

// YEH HAI AAPKA SAHI 'userVerification' MIDDLEWARE
export const userVerification = async (req, res, next) => {
  let token;

  // 1. Check karein ki 'Authorization' header hai aur 'Bearer' se shuru hota hai
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Token ko header se nikaalein ("Bearer [token]")
      token = req.headers.authorization.split(" ")[1];

      // 3. Token ko verify karein
      const decoded = jwt.verify(token, process.env.TOKEN_KEY); // Aapka TOKEN_KEY

      // 4. Token ki ID se ADMIN ko dhoondhein (UserModel ko nahi)
      //    aur password hide kar dein
      req.user = await UserModel.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Admin not found with this token" });
      }

      // 5. Agle middleware (isAdmin) par jaayein
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6. Agar token hai hi nahi
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// YEH AAPKA 'isAdmin' MIDDLEWARE HAI (Jo pehle discuss kiya tha)
