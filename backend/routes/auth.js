const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db"); // Database connection
const router = express.Router();
require("dotenv").config();

// Middleware to log all incoming requests to /auth routes
router.use((req, res, next) => {
    console.log(`📩 Incoming request: ${req.method} ${req.path}`);
    console.log("🔍 Request body:", req.body);
    next();
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ✅ Signup Route
router.post("/signup", async (req, res) => {
    console.log("📩 Signup request received:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("⚠️ Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        console.log("🔍 Checking if user already exists...");
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) {
            console.log("⚠️ User already exists");
            return res.status(400).json({ message: "User already exists. Please log in." });
        }

        console.log("🔑 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("📝 Inserting new user into the database...");
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
            [email, hashedPassword]
        );

        console.log("✅ User created successfully:", newUser.rows[0]);

        // Generate JWT Token
        const token = jwt.sign(
            { id: newUser.rows[0].id, email: newUser.rows[0].email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("🔐 Generated JWT Token");
        
        // Set token as HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.rows[0].id,
                email: newUser.rows[0].email,
                created_at: newUser.rows[0].created_at,
            },
        });

    } catch (err) {
        console.error("❌ Signup error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    console.log("📩 Login request received:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("⚠️ Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        console.log("🔍 Checking if user exists...");
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (userCheck.rows.length === 0) {
            console.log("⚠️ User not found");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = userCheck.rows[0];
        console.log("🔑 Comparing passwords...");
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("❌ Password mismatch");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log("✅ Login successful for:", user.email);
        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("🔐 Generated JWT Token");
        
        // Set token as HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return res.status(200).json({
            message: "Login successful",
            user: { id: user.id, email: user.email },
        });

    } catch (err) {
        console.error("❌ Login error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ✅ Logout Route (Clears the token cookie)
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    console.log("✅ User logged out successfully.");
    return res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("🔎 Checking authentication token...");

    if (!token) {
        console.log("❌ No token found");
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("❌ Invalid token");
            return res.status(403).json({ message: "Invalid token" });
        }
        console.log("✅ Token verified for user:", user.email);
        req.user = user;
        next();
    });
};

// ✅ Protected Route Example (Modify as needed)
router.get("/protected", authenticateToken, (req, res) => {
    return res.json({ message: "You have accessed a protected route", user: req.user });
});

module.exports = router;
