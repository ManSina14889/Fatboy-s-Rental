const express = require('express');
const pool = require('../db.js');

const router = express.Router();

// Get all approved bikes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bikes WHERE approved = TRUE AND available = TRUE');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Post a new bike
router.post('/', async (req, res) => {
    const { name, owner_id, category_id, rental_price, image_url, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bikes (name, owner_id, category_id, rental_price, available, image_url, description) VALUES ($1, $2, $3, $4, TRUE, $5, $6) RETURNING *',
            [name, owner_id, category_id, rental_price, image_url, description]
        );
        res.json({ message: 'Bike submitted for approval', bike: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve a bike
router.put('/approve/:bikeId', async (req, res) => {
    const { bikeId } = req.params;
    try {
        await pool.query('UPDATE bikes SET approved = TRUE WHERE id = $1', [bikeId]);
        res.json({ message: 'Bike approved' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
