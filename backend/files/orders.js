const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

// POST /api/orders — place a new order
router.post('/', verifyToken, requireRole('customer'), async (req, res) => {
  const { restaurant_id, items, delivery_address } = req.body;
  // items = [{ menu_id, quantity }, ...]

  if (!restaurant_id || !items || items.length === 0 || !delivery_address) {
    return res.status(400).json({ message: 'restaurant_id, items and delivery_address are required.' });
  }

  try {
    // Calculate total from DB prices
    let total = 0;
    const itemDetails = [];
    for (const item of items) {
      const [menuRows] = await db.query('SELECT price FROM MENU WHERE menu_id = ?', [item.menu_id]);
      if (menuRows.length === 0) return res.status(404).json({ message: `Menu item ${item.menu_id} not found.` });
      const price = parseFloat(menuRows[0].price);
      total += price * item.quantity;
      itemDetails.push({ menu_id: item.menu_id, quantity: item.quantity, unit_price: price });
    }

    // Create order
    const [orderResult] = await db.query(
      'INSERT INTO `ORDER` (user_id, restaurant_id, total_amount, delivery_address) VALUES (?, ?, ?, ?)',
      [req.user.user_id, restaurant_id, total.toFixed(2), delivery_address]
    );
    const order_id = orderResult.insertId;

    // Insert order items
    for (const item of itemDetails) {
      await db.query(
        'INSERT INTO ORDER_ITEM (order_id, menu_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [order_id, item.menu_id, item.quantity, item.unit_price]
      );
    }

    res.status(201).json({ message: 'Order placed successfully.', order_id, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order.' });
  }
});

// GET /api/orders/my — customer's order history
router.get('/my', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.*, r.name AS restaurant_name 
       FROM \`ORDER\` o 
       JOIN RESTAURANT r ON o.restaurant_id = r.restaurant_id
       WHERE o.user_id = ? ORDER BY o.order_date DESC`,
      [req.user.user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});

// GET /api/orders/:id — single order with items
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [order] = await db.query('SELECT * FROM `ORDER` WHERE order_id = ?', [req.params.id]);
    if (order.length === 0) return res.status(404).json({ message: 'Order not found.' });

    const [items] = await db.query(
      `SELECT oi.*, m.item_name FROM ORDER_ITEM oi 
       JOIN MENU m ON oi.menu_id = m.menu_id 
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    res.json({ ...order[0], items });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order.' });
  }
});

// PUT /api/orders/:id/status — update order status (owner/admin)
router.put('/:id/status', verifyToken, requireRole('owner', 'admin', 'rider'), async (req, res) => {
  const { order_status } = req.body;
  try {
    await db.query('UPDATE `ORDER` SET order_status = ? WHERE order_id = ?', [order_status, req.params.id]);
    res.json({ message: 'Order status updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status.' });
  }
});

// GET /api/orders/restaurant/:restaurantId — orders for a restaurant (owner)
router.get('/restaurant/:restaurantId', verifyToken, requireRole('owner', 'admin'), async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM `ORDER` WHERE restaurant_id = ? ORDER BY order_date DESC',
      [req.params.restaurantId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch restaurant orders.' });
  }
});

module.exports = router;
