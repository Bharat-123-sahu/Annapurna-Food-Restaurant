import { UserModel } from "../model/Usermodel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });

    // Verify token synchronously (throws if invalid)
    const data = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await UserModel.findById(data.id);
    if (user) return res.json({ status: true, user: user.username });
    else return res.json({ status: false });
  } catch (error) {
    console.error(error);
    res.json({ status: false });
  }
};

