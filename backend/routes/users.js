const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/me', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, phone, role, created_at FROM USER WHERE user_id = ?', [req.user.user_id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found.' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch profile.' }); }
});

router.put('/me', verifyToken, async (req, res) => {
  const { name, phone } = req.body;
  try {
    await db.query('UPDATE USER SET name = ?, phone = ? WHERE user_id = ?', [name, phone, req.user.user_id]);
    res.json({ message: 'Profile updated.' });
  } catch (err) { res.status(500).json({ message: 'Failed to update profile.' }); }
});

router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, name, email, phone, role, created_at FROM USER ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ message: 'Failed to fetch users.' }); }
});

module.exports = router;
