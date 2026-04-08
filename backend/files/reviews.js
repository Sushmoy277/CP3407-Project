const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

// POST /api/reviews — submit a review
router.post('/', verifyToken, requireRole('customer'), async (req, res) => {
  const { restaurant_id, order_id, rating, comment } = req.body;
  if (!restaurant_id || !rating) {
    return res.status(400).json({ message: 'restaurant_id and rating are required.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO REVIEW (user_id, restaurant_id, order_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [req.user.user_id, restaurant_id, order_id || null, rating, comment || null]
    );
    res.status(201).json({ message: 'Review submitted.', review_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review.' });
  }
});

// GET /api/reviews/:restaurantId — get reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.name AS reviewer_name FROM REVIEW r
       JOIN USER u ON r.user_id = u.user_id
       WHERE r.restaurant_id = ? ORDER BY r.created_at DESC`,
      [req.params.restaurantId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

module.exports = router;
