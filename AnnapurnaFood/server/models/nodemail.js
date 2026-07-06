import mongoose from "mongoose";
import { Mailschema } from "../schemas/nodemale.js";

export const MailModel = mongoose.model("mail", Mailschema);
