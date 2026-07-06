import express from "express"
import { Sendmail } from "../controllers/nodeemailercontroller.js";

export const Nodemail =express.Router();
Nodemail.post("/nodemail",Sendmail)