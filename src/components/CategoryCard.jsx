import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/shop?category=${category.name.toLowerCase()}`} className="category-card">
      <div className="category-image-container">
        <img src={category.image} alt={category.name} className="category-image" />
        <div className="category-overlay"></div>
      </div>
      <div className="category-content">
        <h3 className="category-title">{category.name}</h3>
        <p className="category-count">{category.count} Books</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
