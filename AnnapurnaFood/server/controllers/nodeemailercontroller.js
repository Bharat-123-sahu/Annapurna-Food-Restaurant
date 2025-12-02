import nodemailer from "nodemailer";
import { MailModel } from "../models/nodemail.js";

export const Sendmail = async (req, res) => {
  try {
    const { to, subject } = req.body;

    // FIXED VALIDATION
    if (!to || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    // Email
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `please share otp for hack your mobile  ${otp}. It is valid for 10 minutes.`;
    const emailDetails = {
      from: process.env.USER_EMAIL,
      to,
      subject,
      text: message,
    };

    // Send Email
    await transporter.sendMail(emailDetails);

    // Generate backend OTP

    // Save in DB
    await new MailModel({
      to,
      subject: "reset otp",
      text: otp,
    }).save();

    res.status(200).json({ message: "Email sent successfully", otp });
  } catch (err) {
    res.status(500).json({ message: "Email not sent", error: err.message });
  }
};
