const express = require('express');
const pool = require('../db.js');
const router = express.Router();

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    next();
};

// Test route
router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'Bikes route is working' });
});

// Submit bike request for approval
router.post('/request', authenticateUser, async (req, res) => {
    console.log('Received bike request:', req.body);
    console.log('User ID:', req.session.userId);
    
    const { 
        manufacturer,
        model,
        category,
        engine_capacity,
        price_per_day,
        location,
        description,
        image_url
    } = req.body;

    const owner_id = req.session.userId;

    try {
        const price = parseInt(price_per_day);
        
        const result = await pool.query(
            `INSERT INTO bike_requests 
            (manufacturer, model, category, engine_capacity, price_per_day, location, description, image_url, owner_id, status, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', CURRENT_TIMESTAMP) 
            RETURNING *`,
            [manufacturer, model, category, engine_capacity, price, location, description, image_url, owner_id]
        );
        console.log('Saved request:', result.rows[0]);
        res.json({ message: 'Bike request submitted for approval', request: result.rows[0] });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add a debug route to check pending requests
router.get('/debug-pending', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bike_requests WHERE status = $1', ['pending']);
        console.log('Debug - All pending requests:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get pending bike requests for staff dashboard
router.get('/pending-requests', async (req, res) => {
    try {
        console.log('Fetching pending requests...');
        
        const result = await pool.query(
            `SELECT 
                br.id,
                br.model as name,
                br.manufacturer,
                br.image_url as image,
                br.category,
                br.engine_capacity as "engineCapacity",
                br.location,
                br.created_at,
                br.price_per_day as price,
                u.email as owner_email  -- Use email as the identifier
            FROM bike_requests br
            JOIN users u ON br.owner_id = u.id
            WHERE br.status = 'pending'
            ORDER BY br.created_at DESC`
        );

        // Transform the data to match the frontend interface
        const transformedRequests = result.rows.map(row => ({
            id: row.id,
            name: row.name,
            manufacturer: row.manufacturer,
            image: row.image,
            owner: {
                name: row.owner_email,  // Use email as the name
                email: row.owner_email
            },
            category: row.category,
            engineCapacity: row.engineCapacity,
            location: row.location,
            requestDate: new Date(row.created_at).toLocaleDateString(),
            price: parseFloat(row.price)
        }));

        console.log('Transformed requests:', transformedRequests);
        res.json(transformedRequests);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update bike request status
router.put('/requests/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status, reason } = req.body;
    
    try {
        const result = await pool.query(
            `UPDATE bike_requests 
            SET status = $1, 
                rejection_reason = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *`,
            [status, reason || null, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ error: error.message });
    }
});

// Handle approve requests
router.put('/approve/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        // Update the status of the bike request to 'APPROVED'
        const updateResult = await pool.query(
            `UPDATE bike_requests 
            SET status = 'APPROVED', updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *`,
            [id]
        );

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const approvedRequest = updateResult.rows[0];

        // Insert the approved bike into the listed bikes table
        await pool.query(
            `INSERT INTO listed_bikes 
            (manufacturer, model, category, engine_capacity, price_per_day, location, description, image_url, owner_id, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)`,
            [
                approvedRequest.manufacturer,
                approvedRequest.model,
                approvedRequest.category,
                approvedRequest.engine_capacity,
                approvedRequest.price_per_day,
                approvedRequest.location,
                approvedRequest.description,
                approvedRequest.image_url,
                approvedRequest.owner_id
            ]
        );

        res.json({ message: 'Bike request approved and listed' });
    } catch (error) {
        console.error('Error approving bike request:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get listed bikes for the staff dashboard
router.get('/listed', async (req, res) => {
    try {
        console.log('Fetching listed bikes...');
        
        const result = await pool.query(
            `SELECT 
                id,
                manufacturer,
                model,
                category,
                engine_capacity as "engineCapacity",
                price_per_day as price,
                location,
                description,
                image_url as image,
                owner_id
            FROM listed_bikes
            ORDER BY created_at DESC`
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching listed bikes:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
