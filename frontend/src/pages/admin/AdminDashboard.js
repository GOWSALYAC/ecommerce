import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function AdminDashboard() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  if (!user || !user.isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard 🛠️</h2>
      <div className="admin-cards">
        <Link to="/admin/products" className="admin-card">
          <h3>📦 Manage Products</h3>
          <p>Add, edit, delete products</p>
        </Link>
        <Link to="/admin/orders" className="admin-card">
          <h3>📋 Manage Orders</h3>
          <p>View and update order status</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;