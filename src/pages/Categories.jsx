import React from 'react';
import { categories } from '../data/mockData';
import CategoryCard from '../components/CategoryCard';
import SEO from '../components/SEO';
import './Categories.css';

const Categories = () => {
  return (
    <div className="categories-page container">
      <SEO 
        title="Book Categories" 
        description="Explore books by category. Find your favorite genres from fantasy and sci-fi to biographies." 
      />
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
