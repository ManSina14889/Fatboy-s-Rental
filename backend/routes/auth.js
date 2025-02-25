const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const pool = require("../db"); // Database connection
const router = express.Router();

// Configure session middleware
router.use(session({
    secret: "your_secret_key", // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// ✅ Signup Route
router.post("/signup", async (req, res) => {
    console.log("📩 Signup request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
            [email, hashedPassword]
        );

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0]
        });
    } catch (err) {
        console.error("❌ Signup error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    console.log("📩 Login request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = userCheck.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        req.session.userId = user.id; // Store user ID in session
        return res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email } });
    } catch (err) {
        console.error("❌ Login error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// ✅ Logout Route
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({ message: "Logged out successfully" });
    });
});

// ✅ Middleware to Protect Routes
const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
};

// ✅ Protected Route Example
router.get("/protected", authenticateUser, (req, res) => {
    return res.json({ message: "You have accessed a protected route", userId: req.session.userId });
});

module.exports = router;
