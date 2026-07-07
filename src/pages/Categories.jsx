import React from 'react';
import { categories } from '../data/mockData';
import CategoryCard from '../components/CategoryCard';
import './Categories.css';

const Categories = () => {
  return (
    <div className="categories-page container">
      <div className="categories-header">
        <h1>All Categories</h1>
        <p>Explore our extensive collection of books across all genres.</p>
      </div>

      <div className="categories-grid-large">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
