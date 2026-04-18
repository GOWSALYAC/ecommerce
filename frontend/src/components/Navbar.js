import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Navbar() {
  const { user, logout, cart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🛒 ShopEasy</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;