const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

// POST /api/payments — record a payment for an order
router.post('/', verifyToken, async (req, res) => {
  const { order_id, payment_method, transaction_ref } = req.body;
  if (!order_id || !payment_method) {
    return res.status(400).json({ message: 'order_id and payment_method are required.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO PAYMENT (order_id, payment_method, payment_status, transaction_ref) VALUES (?, ?, ?, ?)',
      [order_id, payment_method, 'paid', transaction_ref || null]
    );
    res.status(201).json({ message: 'Payment recorded.', payment_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record payment.' });
  }
});

// GET /api/payments/:orderId — get payment for an order
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PAYMENT WHERE order_id = ?', [req.params.orderId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Payment not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payment.' });
  }
});

module.exports = router;
