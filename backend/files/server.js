const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

// ── Routes ──
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/users',       require('./routes/users'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/menu',        require('./routes/menu'));
app.use('/api/orders',      require('./routes/orders'));
app.use('/api/payments',    require('./routes/payments'));
app.use('/api/delivery',    require('./routes/delivery'));
app.use('/api/reviews',     require('./routes/reviews'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({ message: '🍔 FeedMe API is running!', status: 'OK' });
});

// ── Start server ──
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ FeedMe server running on http://localhost:${PORT}`);
});
