const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, requireRole } = require('../middleware/auth');

// Assign rider
router.post('/', verifyToken, requireRole('admin', 'owner'), async (req, res) => {
  const { order_id, rider_id } = req.body;

  if (!order_id || !rider_id) {
    return res.status(400).json({ message: 'order_id and rider_id are required.' });
  }

  try {
    const [existing] = await db.query(
      'SELECT * FROM DELIVERY WHERE order_id = ?',
      [order_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Rider already assigned for this order.' });
    }

    const [result] = await db.query(
      'INSERT INTO DELIVERY (order_id, rider_id, delivery_status) VALUES (?, ?, ?)',
      [order_id, rider_id, 'assigned']
    );

    const io = req.app.get('io');

    io.to(`rider_${rider_id}`).emit('delivery_assigned', {
      delivery_id: result.insertId,
      order_id
    });

    io.to(`order_${order_id}`).emit('delivery_status_updated', {
      order_id,
      delivery_status: 'assigned'
    });

    res.status(201).json({
      message: 'Rider assigned.',
      delivery_id: result.insertId
    });
  } catch (err) {
    console.error('Assign rider error:', err);
    res.status(500).json({ message: 'Failed to assign rider.' });
  }
});

// Rider deliveries
router.get('/rider/my', verifyToken, requireRole('rider'), async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, o.delivery_address, o.total_amount, o.order_status, o.restaurant_id,
              r.name AS restaurant_name, u.full_name AS customer_name
       FROM DELIVERY d
       JOIN \`ORDER\` o ON d.order_id = o.order_id
       JOIN RESTAURANT r ON o.restaurant_id = r.restaurant_id
       JOIN USER u ON o.user_id = u.user_id
       WHERE d.rider_id = ?
       ORDER BY d.delivery_id DESC`,
      [req.user.user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error('Fetch deliveries error:', err);
    res.status(500).json({ message: 'Failed to fetch deliveries.' });
  }
});

// Update delivery status
router.put('/:id/status', verifyToken, requireRole('rider', 'admin'), async (req, res) => {
  const { delivery_status } = req.body;

  const allowedStatuses = ['assigned', 'picked_up', 'on_the_way', 'delivered'];
  if (!delivery_status || !allowedStatuses.includes(delivery_status)) {
    return res.status(400).json({ message: 'Invalid delivery status.' });
  }

  try {
    const deliveryId = req.params.id;

    const [deliveryRows] = await db.query(
      'SELECT * FROM DELIVERY WHERE delivery_id = ?',
      [deliveryId]
    );

    if (deliveryRows.length === 0) {
      return res.status(404).json({ message: 'Delivery not found.' });
    }

    const delivery = deliveryRows[0];
    const orderId = delivery.order_id;

    const deliveryTime = delivery_status === 'delivered' ? new Date() : null;

    await db.query(
      'UPDATE DELIVERY SET delivery_status = ?, delivery_time = ? WHERE delivery_id = ?',
      [delivery_status, deliveryTime, deliveryId]
    );

    // keep ORDER table in sync
    if (delivery_status === 'picked_up' || delivery_status === 'on_the_way') {
      await db.query(
        'UPDATE `ORDER` SET order_status = ? WHERE order_id = ?',
        ['out_for_delivery', orderId]
      );
    }

    if (delivery_status === 'delivered') {
      await db.query(
        'UPDATE `ORDER` SET order_status = ? WHERE order_id = ?',
        ['delivered', orderId]
      );
    }

    const io = req.app.get('io');

    io.to(`order_${orderId}`).emit('delivery_status_updated', {
      order_id: orderId,
      delivery_status
    });

    if (delivery_status === 'picked_up' || delivery_status === 'on_the_way') {
      io.to(`order_${orderId}`).emit('order_status_updated', {
        order_id: orderId,
        order_status: 'out_for_delivery'
      });
    }

    if (delivery_status === 'delivered') {
      io.to(`order_${orderId}`).emit('order_status_updated', {
        order_id: orderId,
        order_status: 'delivered'
      });
    }

    res.json({ message: 'Delivery status updated.' });
  } catch (err) {
    console.error('Update delivery status error:', err);
    res.status(500).json({ message: 'Failed to update delivery status.' });
  }
});

module.exports = router;
