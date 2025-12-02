import mongoose from "mongoose";

export const Mailschema = new mongoose.Schema({
  to: String,
  subject: String,
  text: String,
});
