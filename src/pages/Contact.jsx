import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page container">
      <SEO 
        title="Contact Us" 
        description="Get in touch with the Book Hub team for support, inquiries, or feedback." 
      />
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out this form or get in touch using the details below.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <div className="info-grid">
            <div className="info-card">
              <MapPin size={24} className="info-icon" />
              <h3>Address</h3>
              <p>123 Bookish Lane<br/>Reading City, RC 10012</p>
            </div>
            <div className="info-card">
              <Phone size={24} className="info-icon" />
              <h3>Phone</h3>
              <p>+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
            </div>
            <div className="info-card">
              <Mail size={24} className="info-icon" />
              <h3>Email</h3>
              <p>support@bookhub.com<br/>info@bookhub.com</p>
            </div>
            <div className="info-card">
              <Clock size={24} className="info-icon" />
              <h3>Business Hours</h3>
              <p>Mon-Fri: 9am - 8pm<br/>Sat-Sun: 10am - 6pm</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send a Message</h2>
          {submitted ? (
            <div style={{padding: '2rem', backgroundColor: '#e6f4ea', color: '#1e8e3e', borderRadius: '8px', marginBottom: '2rem'}}>
              <h3>Thank you for your message!</h3>
              <p>We have received your inquiry and will get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
