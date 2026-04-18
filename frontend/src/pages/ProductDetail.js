import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://ecommerce-bcy7.onrender.com/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="detail-img">
        {product.image ? <img src={product.image} alt={product.name} /> : <div className="no-img-lg">📦</div>}
      </div>
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p className="detail-category">{product.category}</p>
        <p className="detail-price">₹{product.price}</p>
        <p className="detail-desc">{product.description}</p>
        <p className={`detail-stock ${product.stock === 0 ? 'out' : ''}`}>
          {product.stock === 0 ? 'Out of Stock' : `In Stock: ${product.stock}`}
        </p>
        <button
          className="btn-primary"
          onClick={() => { if (!user) navigate('/login'); else addToCart(product); }}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;