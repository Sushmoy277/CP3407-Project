const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

// POST /api/delivery — assign rider to order (admin/owner)
router.post('/', verifyToken, requireRole('admin', 'owner'), async (req, res) => {
  const { order_id, rider_id } = req.body;
  if (!order_id || !rider_id) {
    return res.status(400).json({ message: 'order_id and rider_id are required.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO DELIVERY (order_id, rider_id, delivery_status) VALUES (?, ?, ?)',
      [order_id, rider_id, 'assigned']
    );
    res.status(201).json({ message: 'Rider assigned.', delivery_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign rider.' });
  }
});

// GET /api/delivery/rider/my — rider's assigned deliveries
router.get('/rider/my', verifyToken, requireRole('rider'), async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, o.delivery_address, o.total_amount, r.name AS restaurant_name
       FROM DELIVERY d
       JOIN \`ORDER\` o ON d.order_id = o.order_id
       JOIN RESTAURANT r ON o.restaurant_id = r.restaurant_id
       WHERE d.rider_id = ? AND d.delivery_status != 'delivered'`,
      [req.user.user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deliveries.' });
  }
});

// PUT /api/delivery/:id/status — update delivery status (rider)
router.put('/:id/status', verifyToken, requireRole('rider', 'admin'), async (req, res) => {
  const { delivery_status } = req.body;
  try {
    const deliveryTime = delivery_status === 'delivered' ? new Date() : null;
    await db.query(
      'UPDATE DELIVERY SET delivery_status = ?, delivery_time = ? WHERE delivery_id = ?',
      [delivery_status, deliveryTime, req.params.id]
    );
    res.json({ message: 'Delivery status updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update delivery status.' });
  }
});

// GET /api/delivery/:orderId — get delivery info for an order
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, u.name AS rider_name, u.phone AS rider_phone
       FROM DELIVERY d JOIN USER u ON d.rider_id = u.user_id
       WHERE d.order_id = ?`,
      [req.params.orderId]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Delivery not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch delivery.' });
  }
});

module.exports = router;
