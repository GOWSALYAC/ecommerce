import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: 'Electronics', image: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/products', formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      setFormData({ name: '', description: '', price: '', category: 'Electronics', image: '', stock: '' });
      fetchProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({ name: product.name, description: product.description, price: product.price, category: product.category, image: product.image, stock: product.stock });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    }
  };

  return (
    <div className="admin-products">
      <h2>Manage Products</h2>
      <div className="admin-form">
        <h3>{editId ? 'Edit Product' : 'Add Product'}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Food</option>
            <option>Other</option>
          </select>
          <input type="text" name="image" placeholder="Image URL (optional)" value={formData.image} onChange={handleChange} />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add Product'}</button>
          {editId && <button type="button" className="btn-cancel" onClick={() => setEditId(null)}>Cancel</button>}
        </form>
      </div>
      <div className="products-list">
        {products.map(product => (
          <div key={product._id} className="admin-product-item">
            <div>
              <h4>{product.name}</h4>
              <p>₹{product.price} | {product.category} | Stock: {product.stock}</p>
            </div>
            <div className="admin-actions">
              <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;