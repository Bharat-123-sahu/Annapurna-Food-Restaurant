import { AdminModel } from "../models/Adminmodel.js";
import { RestaurantModel } from "../models/Restaurantmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// we have 
registerAdmin
loginAdmin
verifyAdmin
getAllAdmins
updateAdmin
deleteAdmin
getAllRestaurants
updateRestaurantStatus
logoutAdmin

//  Helper: Generate JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "3d" });
};

//  1️⃣ Register new admin (Only superadmin can create)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role, restaurant } = req.body;

    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
      role,
      restaurant,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: newAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

//  2️⃣ Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(admin._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Admin logged in successfully",
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in admin", error });
  }
};

//  3️⃣ Verify admin (JWT)
export const verifyAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ status: false });

    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    const admin = await AdminModel.findById(verified.id);

    if (!admin) return res.json({ status: false });

    res.json({
      status: true,
      admin: { name: admin.name, role: admin.role, email: admin.email },
    });
  } catch (error) {
    res.json({ status: false, error });
  }
};

//  4️⃣ Get all admins (superadmin only)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find().populate("restaurant");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

//  5️⃣ Update admin details
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, restaurant } = req.body;

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { name, email, role, restaurant },
      { new: true }
    );

    res.json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error });
  }
};

//  6️⃣ Delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await AdminModel.findByIdAndDelete(id);
    alert("conform delete")
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
};

//  7️⃣ Get all restaurants (for superadmin dashboard)
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching restaurants", error });
  }
};

//  8️⃣ Approve / Reject restaurant (superadmin control)
export const updateRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // approved / rejected

    const restaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      message: `Restaurant ${status} successfully`,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating restaurant", error });
  }
};

//  9️⃣ Logout admin
export const logoutAdmin = (req, res) => {
  res.clearCookie("token").json({ message: "Admin logged out successfully" });
};
