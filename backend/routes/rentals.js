const express = require('express');
const pool = require('../db.js');

const router = express.Router();

// Rent a bike
router.post('/', async (req, res) => {
    const { user_id, bike_id, start_date, end_date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO rentals (user_id, bike_id, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, bike_id, start_date, end_date, 'ongoing']
        );
        await pool.query('UPDATE bikes SET available = FALSE WHERE id = $1', [bike_id]);
        res.json({ message: 'Bike rented successfully', rental: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
