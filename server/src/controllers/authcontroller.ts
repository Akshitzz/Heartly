import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};


const isStrongPassword = (password: string): boolean => {

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password) && password.length <= 128;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body;


    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: "Name, email, password, and phone are required" });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
      });
    }


    const existing = await User.findOne({ email: sanitizedEmail });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);


    await User.create({
      name: name.trim(),
      email: sanitizedEmail,
      password: hashedPassword,
      phone: phone.trim(),
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }


    const sanitizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const user = await User.findOne({ email: sanitizedEmail }).select("+password");
    if (!user) {

      return res.status(401).json({ message: "Invalid credentials" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }


    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );


    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};