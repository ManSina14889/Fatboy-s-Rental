const express = require('express');
const pool = require('../db.js');
const router = express.Router();

// Create a new rental
router.post('/create', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Please log in to create a rental' });
    }

    const { bike_id, start_date, end_date, total_amount } = req.body;
    const userId = req.session.userId;

    try {
        // Check if the bike exists
        const bikeCheck = await pool.query(
            'SELECT id, manufacturer, model, available FROM listed_bikes WHERE id = $1',
            [bike_id]
        );

        if (bikeCheck.rows.length === 0) {
            return res.status(400).json({ error: 'Bike does not exist' });
        }

        const bike = bikeCheck.rows[0];

        if (!bike.available) {
            return res.status(400).json({ error: 'Bike is not available for rental' });
        }

        await pool.query('BEGIN');

        // Create rental record
        const rentalResult = await pool.query(
            `INSERT INTO rentals (bike_id, user_id, start_date, end_date, total_amount, status)
             VALUES ($1, $2, $3, $4, $5, 'ACTIVE')
             RETURNING id`,
            [bike_id, userId, start_date, end_date, total_amount]
        );

        await pool.query(
            `INSERT INTO active_rentals (rental_id, bike_id, user_id, start_date, end_date, total_amount)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [rentalResult.rows[0].id, bike_id, userId, start_date, end_date, total_amount]
        );

        await pool.query(
            'UPDATE listed_bikes SET available = false WHERE id = $1',
            [bike_id]
        );

        await pool.query('COMMIT');
        res.json({ 
            success: true, 
            rentalId: rentalResult.rows[0].id,
            message: 'Rental created successfully'
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating rental:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get all active rentals for staff dashboard
// Add this route if it's not already there
// Add this route before module.exports
router.get('/active', async (req, res) => {
    try {
        const activeRentals = await pool.query(`
            SELECT r.*, lb.manufacturer, lb.model, lb.image_url,
                   u.email
            FROM rentals r
            JOIN listed_bikes lb ON r.bike_id = lb.id
            JOIN users u ON r.user_id = u.id
            WHERE r.status = 'ACTIVE'
            ORDER BY r.start_date DESC
        `);

        const formattedRentals = activeRentals.rows.map(rental => ({
            id: rental.id,
            bike: {
                id: rental.bike_id,
                manufacturer: rental.manufacturer,
                model: rental.model,
                image: rental.image_url
            },
            renter: {
                email: rental.email
            },
            contract: {
                startDate: rental.start_date,
                endDate: rental.end_date,
                totalAmount: rental.total_amount,
                status: rental.status,
                deposit: rental.deposit
            }
        }));

        res.json(formattedRentals);
    } catch (error) {
        console.error('Error fetching active rentals:', error);
        res.status(500).json({ error: 'Failed to fetch active rentals' });
    }
});

module.exports = router;
