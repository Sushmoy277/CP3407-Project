const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

// GET /api/menu/:restaurantId — get menu for a restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM MENU WHERE restaurant_id = ? AND is_available = TRUE',
      [req.params.restaurantId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch menu.' });
  }
});

// POST /api/menu — add menu item (owner only)
router.post('/', verifyToken, requireRole('owner', 'admin'), async (req, res) => {
  const { restaurant_id, item_name, description, price, category } = req.body;
  if (!restaurant_id || !item_name || !price) {
    return res.status(400).json({ message: 'restaurant_id, item_name and price are required.' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO MENU (restaurant_id, item_name, description, price, category) VALUES (?, ?, ?, ?, ?)',
      [restaurant_id, item_name, description || null, price, category || null]
    );
    res.status(201).json({ message: 'Menu item added.', menu_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add menu item.' });
  }
});

// PUT /api/menu/:id — update menu item
router.put('/:id', verifyToken, requireRole('owner', 'admin'), async (req, res) => {
  const { item_name, description, price, category, is_available } = req.body;
  try {
    await db.query(
      'UPDATE MENU SET item_name=?, description=?, price=?, category=?, is_available=? WHERE menu_id=?',
      [item_name, description, price, category, is_available, req.params.id]
    );
    res.json({ message: 'Menu item updated.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update menu item.' });
  }
});

// DELETE /api/menu/:id
router.delete('/:id', verifyToken, requireRole('owner', 'admin'), async (req, res) => {
  try {
    await db.query('DELETE FROM MENU WHERE menu_id = ?', [req.params.id]);
    res.json({ message: 'Menu item deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete menu item.' });
  }
});

module.exports = router;
