const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

router.post('/', verifyToken, requireRole('admin', 'owner'), async (req, res) => {
  const { order_id, rider_id } = req.body;
  if (!order_id || !rider_id) return res.status(400).json({ message: 'order_id and rider_id are required.' });
  try {
    const [result] = await db.query('INSERT INTO DELIVERY (order_id, rider_id, delivery_status) VALUES (?, ?, ?)', [order_id, rider_id, 'assigned']);
    res.status(201).json({ message: 'Rider assigned.', delivery_id: result.insertId });
  } catch (err) { res.status(500).json({ message: 'Failed to assign rider.' }); }
});

router.get('/rider/my', verifyToken, requireRole('rider'), async (req, res) => {
  try {
    const [rows] = await db.query('SELECT d.*, o.delivery_address, o.total_amount FROM DELIVERY d JOIN `ORDER` o ON d.order_id = o.order_id WHERE d.rider_id = ?', [req.user.user_id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch deliveries.' }); }
});

router.put('/:id/status', verifyToken, requireRole('rider', 'admin'), async (req, res) => {
  const { delivery_status } = req.body;
  try {
    const deliveryTime = delivery_status === 'delivered' ? new Date() : null;
    await db.query('UPDATE DELIVERY SET delivery_status = ?, delivery_time = ? WHERE delivery_id = ?', [delivery_status, deliveryTime, req.params.id]);
    res.json({ message: 'Delivery status updated.' });
  } catch (err) { res.status(500).json({ message: 'Failed to update delivery status.' }); }
});

module.exports = router;
