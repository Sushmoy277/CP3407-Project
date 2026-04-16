const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',        require('./routes/auth'));
app.use('/api/users',       require('./routes/users'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/menu',        require('./routes/menu'));
app.use('/api/orders',      require('./routes/orders'));
app.use('/api/payments',    require('./routes/payments'));
app.use('/api/delivery',    require('./routes/delivery'));
app.use('/api/reviews',     require('./routes/reviews'));

app.get('/', (req, res) => {
  res.json({ message: '🍔 FeedMe API is running!', status: 'OK' });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT']
  }
});

// make io available inside routes
app.set('io', io);

io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);

  // Customer tracking room
  socket.on('join_order_room', (orderId) => {
    socket.join(`order_${orderId}`);
    console.log(`Socket ${socket.id} joined order_${orderId}`);
  });

  // Restaurant dashboard room
  socket.on('join_restaurant_room', (restaurantId) => {
    socket.join(`restaurant_${restaurantId}`);
    console.log(`Socket ${socket.id} joined restaurant_${restaurantId}`);
  });

  // Rider room
  socket.on('join_rider_room', (riderId) => {
    socket.join(`rider_${riderId}`);
    console.log(`Socket ${socket.id} joined rider_${riderId}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ FeedMe server running on http://localhost:${PORT}`);
});
