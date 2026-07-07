import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, BookOpen, Star } from 'lucide-react';
import { books, categories, authors } from '../data/mockData';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const bestSellers = books.filter(book => book.isBestSeller).slice(0, 4);
  const newArrivals = books.filter(book => book.isNewArrival);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Next Great Read</h1>
            <p className="hero-description">
              Explore thousands of books across all genres. From gripping thrillers to insightful non-fiction, we have something for every reader.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Explore Books <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" 
              alt="Books on a shelf" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container features-container">
          <div className="feature-card">
            <BookOpen size={40} className="feature-icon" />
            <h3>Huge Collection</h3>
            <p>Over 10,000+ titles available</p>
          </div>
          <div className="feature-card">
            <ShieldCheck size={40} className="feature-icon" />
            <h3>Secure Shopping</h3>
            <p>100% secure payment processing</p>
          </div>
          <div className="feature-card">
            <Truck size={40} className="feature-icon" />
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $50</p>
          </div>
          <div className="feature-card">
            <Star size={40} className="feature-icon" />
            <h3>Trusted Publishers</h3>
            <p>Sourced directly from publishers</p>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Featured Categories</h2>
            <Link to="/categories" className="view-all-link">View All Categories <ArrowRight size={16} /></Link>
          </div>
          <div className="categories-grid">
            {categories.slice(0, 4).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Best Sellers</h2>
            <Link to="/shop?filter=bestsellers" className="view-all-link">View All Best Sellers <ArrowRight size={16} /></Link>
          </div>
          <div className="books-grid">
            {bestSellers.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container newsletter-container">
          <div className="newsletter-content">
            <h2>Join Our Reading Community</h2>
            <p>Subscribe to our newsletter and get 15% off your first purchase.</p>
          </div>
          <form className="newsletter-form-large" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{backgroundColor: subscribed ? '#2A9D8F' : ''}}>
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
