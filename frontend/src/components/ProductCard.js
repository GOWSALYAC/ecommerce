import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function ProductCard({ product }) {
  const { addToCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-img" onClick={() => navigate(`/product/${product._id}`)}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-img">📦</div>
        )}
      </div>
      <div className="product-info">
        <h3 onClick={() => navigate(`/product/${product._id}`)}>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">₹{product.price}</p>
        <p className={`stock ${product.stock === 0 ? 'out' : ''}`}>
          {product.stock === 0 ? 'Out of Stock' : `In Stock: ${product.stock}`}
        </p>
        <button
          className="btn-cart"
          onClick={() => {
            if (!user) navigate('/login');
            else addToCart(product);
          }}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;