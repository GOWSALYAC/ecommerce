import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/orders/myorders', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data)).catch(err => console.log(err));
  }, [user]);

  const statusColors = {
    Pending: '#f39c12',
    Processing: '#3498db',
    Shipped: '#9b59b6',
    Delivered: '#2ecc71',
    Cancelled: '#e74c3c'
  };

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet!</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <p>Order ID: {order._id.slice(-8).toUpperCase()}</p>
              <span className="order-status" style={{ backgroundColor: statusColors[order.status] }}>
                {order.status}
              </span>
            </div>
            <div className="order-items">
              {order.items.map((item, i) => (
                <p key={i}>{item.name} x{item.quantity} — ₹{item.price * item.quantity}</p>
              ))}
            </div>
            <div className="order-footer">
              <p>📍 {order.address}</p>
              <p className="order-total">Total: ₹{order.totalAmount}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;