const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RESTAURANT WHERE is_active = TRUE ORDER BY name ASC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch restaurants.' }); }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RESTAURANT WHERE restaurant_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Restaurant not found.' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch restaurant.' }); }
});

router.post('/', verifyToken, requireRole('owner', 'admin'), async (req, res) => {
  const { name, location, contact_number } = req.body;
  if (!name || !location) return res.status(400).json({ message: 'Name and location are required.' });
  try {
    const [result] = await db.query('INSERT INTO RESTAURANT (name, location, contact_number, owner_id) VALUES (?, ?, ?, ?)', [name, location, contact_number || null, req.user.user_id]);
    res.status(201).json({ message: 'Restaurant created.', restaurant_id: result.insertId });
  } catch (err) { res.status(500).json({ message: 'Failed to create restaurant.' }); }
});

module.exports = router;
