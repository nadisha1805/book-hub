import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page container">
      <SEO title="Contact Us" description="Get in touch with the Book Hub team. We're here to help with your orders and inquiries." />
      
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have a question or need assistance? We're always here to help.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info-panel">
          <h2>Get In Touch</h2>
          <p className="contact-intro">Whether you have a question about an order, need book recommendations, or just want to say hi, we'd love to hear from you.</p>
          
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon"><MapPin size={24} /></div>
              <div className="info-text">
                <h3>Our Address</h3>
                <p>123 Bookworm Lane, Reading District<br/>New York, NY 10001, USA</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><Phone size={24} /></div>
              <div className="info-text">
                <h3>Phone Number</h3>
                <p>+1 (800) BOOK-HUB<br/>+1 (800) 266-5482</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><Mail size={24} /></div>
              <div className="info-text">
                <h3>Email Address</h3>
                <p>support@bookhub.com<br/>info@bookhub.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon"><Clock size={24} /></div>
              <div className="info-text">
                <h3>Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div className="social-links-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <h2>Send us a Message</h2>
          
          {submitted ? (
            <div className="success-message-box">
              <h3>Thank you for reaching out!</h3>
              <p>Your message has been sent successfully. Our team will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="How can we help?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows="5"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="map-container">
        {/* Placeholder for Google Maps iframe */}
        <div className="map-placeholder">
          <MapPin size={48} className="map-placeholder-icon" />
          <h3>Find Us Here</h3>
          <p>Interactive Map Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
