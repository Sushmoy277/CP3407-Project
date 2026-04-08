const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  const { restaurant_id, items, delivery_address } = req.body;
  if (!restaurant_id || !items || items.length === 0 || !delivery_address) return res.status(400).json({ message: 'restaurant_id, items and delivery_address are required.' });
  try {
    let total = 0;
    const itemDetails = [];
    for (const item of items) {
      const [menuRows] = await db.query('SELECT price FROM MENU WHERE menu_id = ?', [item.menu_id]);
      if (menuRows.length === 0) return res.status(404).json({ message: `Menu item ${item.menu_id} not found.` });
      const price = parseFloat(menuRows[0].price);
      total += price * item.quantity;
      itemDetails.push({ menu_id: item.menu_id, quantity: item.quantity, unit_price: price });
    }
    const [orderResult] = await db.query('INSERT INTO `ORDER` (user_id, restaurant_id, total_amount, delivery_address) VALUES (?, ?, ?, ?)', [req.user.user_id, restaurant_id, total.toFixed(2), delivery_address]);
    const order_id = orderResult.insertId;
    for (const item of itemDetails) {
      await db.query('INSERT INTO ORDER_ITEM (order_id, menu_id, quantity, unit_price) VALUES (?, ?, ?, ?)', [order_id, item.menu_id, item.quantity, item.unit_price]);
    }
    res.status(201).json({ message: 'Order placed successfully.', order_id, total });
  } catch (err) { res.status(500).json({ message: 'Failed to place order.' }); }
});

router.get('/my', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT o.*, r.name AS restaurant_name FROM `ORDER` o JOIN RESTAURANT r ON o.restaurant_id = r.restaurant_id WHERE o.user_id = ? ORDER BY o.order_date DESC', [req.user.user_id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch orders.' }); }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [order] = await db.query('SELECT * FROM `ORDER` WHERE order_id = ?', [req.params.id]);
    if (order.length === 0) return res.status(404).json({ message: 'Order not found.' });
    const [items] = await db.query('SELECT oi.*, m.item_name FROM ORDER_ITEM oi JOIN MENU m ON oi.menu_id = m.menu_id WHERE oi.order_id = ?', [req.params.id]);
    res.json({ ...order[0], items });
  } catch (err) { res.status(500).json({ message: 'Failed to fetch order.' }); }
});

module.exports = router;
