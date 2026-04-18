import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchOrders();
  };

  const statusColors = {
    Pending: '#f39c12', Processing: '#3498db',
    Shipped: '#9b59b6', Delivered: '#2ecc71', Cancelled: '#e74c3c'
  };

  return (
    <div className="admin-orders">
      <h2>Manage Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <p><strong>{order.user?.name}</strong> ({order.user?.email})</p>
            <span className="order-status" style={{ backgroundColor: statusColors[order.status] }}>
              {order.status}
            </span>
          </div>
          <div className="order-items">
            {order.items.map((item, i) => (
              <p key={i}>{item.name} x{item.quantity} — ₹{item.price * item.quantity}</p>
            ))}
          </div>
          <p>📍 {order.address}</p>
          <p><strong>Total: ₹{order.totalAmount}</strong></p>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
            className="status-select"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;