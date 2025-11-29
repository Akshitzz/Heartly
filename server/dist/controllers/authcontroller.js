import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
// Rate limiter for auth endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: "Too many attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
};
// Password strength validation
const isStrongPassword = (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password) && password.length <= 128;
};
export const register = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        // Input validation
        if (!email || !password || !name || !phone) {
            return res.status(400).json({ message: "Name, email, password, and phone are required" });
        }
        // Sanitize and validate email
        const sanitizedEmail = email.trim().toLowerCase();
        if (!isValidEmail(sanitizedEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // Validate password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters with uppercase, lowercase, number, and special character"
            });
        }
        // Check for existing user
        const existing = await User.findOne({ email: sanitizedEmail });
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }
        // Hash password with higher cost factor
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create user
        await User.create({
            name: name.trim(),
            email: sanitizedEmail,
            password: hashedPassword,
            phone: phone.trim(),
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // Sanitize email
        const sanitizedEmail = email.trim().toLowerCase();
        if (!isValidEmail(sanitizedEmail)) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Find user
        const user = await User.findOne({ email: sanitizedEmail }).select("+password");
        if (!user) {
            // Use generic message to prevent user enumeration
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Verify password using constant-time comparison
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Check JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }
        // Generate token with secure settings
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
            algorithm: "HS256",
        });
        // Set secure HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
    }
};
