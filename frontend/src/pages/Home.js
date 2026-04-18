import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Food', 'Other'];

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://ecommerce-bcy7.onrender.com/api/products', {
        params: { search, category }
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchProducts(); }, [search, category]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopEasy 🛒</h1>
        <p>Find the best products at the best prices</p>
      </div>
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {products.length === 0 ? (
        <p className="no-products">No products found!</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;