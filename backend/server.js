const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js'); // Login and Sign-Up routes
const db = require('./db'); // Ensure database connection (if db.js exists)

dotenv.config({ path: './backend/.env' });

const app = express();
const PORT = process.env.PORT || 5004;

// Debugging logs
console.log("Starting server...");
console.log("Configured backend port:", PORT);
console.log("Configured frontend origin:", process.env.FRONTEND_URL || 'http://localhost:5002');

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5003", "http://localhost:5002"], // Allow both origins
    credentials: true, // Allow cookies if needed
  })
);

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logs API requests

// Database connection check
db.query('SELECT 1')
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1); // Exit if DB is not connected
  });

// Debugging Middleware - Logs every request
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Mount routes
app.use('/auth', authRoutes);

// 404 Handler - If no route matches
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unexpected server error:", err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("⚠️ Shutting down server...");
  await db.end(); // Close DB connection if using PostgreSQL
  server.close(() => {
    console.log("✅ Server closed.");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled promise rejection:", err);
});
