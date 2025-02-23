const dotenv = require('dotenv');
dotenv.config(); // Load the environment variables

const { Pool } = require('pg');

// Debugging logs
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", typeof process.env.DB_PASSWORD === "string" ? "✔️ Password is a string" : "❌ Password is NOT a string");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Default to 5432 if not provided
});

pool.on('connect', () => {
    console.log('✅ Connected to the database');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error', err.message);
});

module.exports = pool;
