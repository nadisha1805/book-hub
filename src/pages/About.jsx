import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Building, Shield } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story</h1>
          <p>Connecting readers with their next great adventure since 2024.</p>
        </div>
      </section>

      <section className="about-content container">
        <div className="about-grid">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>At Book Hub, we believe that books have the power to change lives. Our mission is to make the world's best literature accessible to everyone, everywhere. We curate a premium selection of books spanning all genres, from timeless classics to modern masterpieces.</p>
            
            <h2>Our Vision</h2>
            <p>We envision a world where every individual has the opportunity to explore new ideas, empathize with different perspectives, and expand their horizons through the joy of reading. We strive to be more than just a bookstore; we aim to be a community for book lovers.</p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" alt="Library" />
          </div>
        </div>
      </section>

      <section className="about-stats bg-light">
        <div className="container stats-container">
          <div className="stat-card">
            <BookOpen size={40} className="stat-icon" />
            <h3>10,000+</h3>
            <p>Books Available</p>
          </div>
          <div className="stat-card">
            <Users size={40} className="stat-icon" />
            <h3>2,500+</h3>
            <p>Happy Readers</p>
          </div>
          <div className="stat-card">
            <Building size={40} className="stat-icon" />
            <h3>50+</h3>
            <p>Publishers</p>
          </div>
          <div className="stat-card">
            <Shield size={40} className="stat-icon" />
            <h3>100%</h3>
            <p>Secure Shopping</p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <h2>Ready to find your next book?</h2>
          <Link to="/shop" className="btn btn-primary">Explore Our Collection</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
