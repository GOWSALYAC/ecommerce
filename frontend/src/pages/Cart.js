import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, user } = useContext(AppContext);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!user) return navigate('/login');
    const address = prompt('Enter delivery address:');
    if (!address) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/orders', {
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        address
      }, { headers: { Authorization: `Bearer ${token}` } });
      clearCart();
      alert('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (err) {
      alert('Order failed!');
    }
  };

  if (cart.length === 0) return (
    <div className="empty-cart">
      <h2>Your cart is empty 🛒</h2>
      <button className="btn-primary" onClick={() => navigate('/')}>Shop Now</button>
    </div>
  );

  return (
    <div className="cart-page">
      <h2>My Cart</h2>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
          <div className="cart-item-actions">
            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            <button className="btn-remove" onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
          <p className="item-total">₹{item.price * item.quantity}</p>
        </div>
      ))}
      <div className="cart-footer">
        <h3>Total: ₹{total}</h3>
        <button className="btn-primary" onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default Cart;