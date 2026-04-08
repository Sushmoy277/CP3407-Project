const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

router.post('/register', async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
  try {
    const [existing] = await db.query('SELECT user_id FROM USER WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(409).json({ message: 'Email already registered.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO USER (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, phone || null, role || 'customer']);
    res.status(201).json({ message: 'User registered successfully.', user_id: result.insertId });
  } catch (err) { res.status(500).json({ message: 'Server error.' }); }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
  try {
    const [rows] = await db.query('SELECT * FROM USER WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid email or password.' });
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });
    const token = jwt.sign({ user_id: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful.', token, user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ message: 'Server error.' }); }
});

module.exports = router;
