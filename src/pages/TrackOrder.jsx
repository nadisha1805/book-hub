import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Search } from 'lucide-react';
import SEO from '../components/SEO';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId || !email) {
      setError('Please enter both Order ID and Email Address.');
      return;
    }
    
    setError('');
    setIsTracking(true);
    
    // Simulate API call to track order
    setTimeout(() => {
      setIsTracking(false);
      // For demo purposes, if order ID is "12345", we show a not found error
      if (orderId === '12345') {
        setOrderFound(false);
        setError('No order found with the provided details. Please check and try again.');
      } else {
        setOrderFound(true);
      }
    }, 1500);
  };

  return (
    <div className="track-order-page container">
      <SEO title="Track Order" description="Track the status and shipping progress of your Book Hub order." />
      
      <div className="track-header">
        <h1>Track Your Order</h1>
        <p>Enter your Order ID and Email Address to see real-time shipping updates.</p>
      </div>

      <div className="track-form-container">
        <form onSubmit={handleTrack} className="track-form">
          <div className="form-group">
            <label htmlFor="orderId">Order ID</label>
            <input 
              type="text" 
              id="orderId" 
              placeholder="e.g. A1B2C3D4" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary track-btn" disabled={isTracking}>
            {isTracking ? 'Tracking...' : (
              <>Track Order <Search size={18} /></>
            )}
          </button>
        </form>
        {error && <p className="error-msg text-center mt-3">{error}</p>}
      </div>

      {orderFound && (
        <div className="tracking-results">
          <div className="order-summary-header">
            <h3>Order #{orderId.toUpperCase()}</h3>
            <span className="status-badge shipped">In Transit</span>
          </div>
          
          <div className="estimated-delivery">
            <p>Estimated Delivery</p>
            <h4>Thursday, Oct 26, 2023</h4>
          </div>

          <div className="timeline-container">
            <div className="timeline-step completed">
              <div className="step-icon"><CheckCircle size={20} /></div>
              <div className="step-content">
                <h4>Order Placed</h4>
                <p>Oct 21, 2023 - 10:30 AM</p>
              </div>
            </div>
            <div className="timeline-step completed">
              <div className="step-icon"><Package size={20} /></div>
              <div className="step-content">
                <h4>Order Processed</h4>
                <p>Oct 22, 2023 - 02:15 PM</p>
              </div>
            </div>
            <div className="timeline-step active">
              <div className="step-icon"><Truck size={20} /></div>
              <div className="step-content">
                <h4>Shipped</h4>
                <p>Oct 23, 2023 - 09:45 AM</p>
                <span className="location">Currently at: Sorting Facility, NY</span>
              </div>
            </div>
            <div className="timeline-step pending">
              <div className="step-icon"><CheckCircle size={20} /></div>
              <div className="step-content">
                <h4>Out for Delivery</h4>
                <p>Pending</p>
              </div>
            </div>
            <div className="timeline-step pending">
              <div className="step-icon"><CheckCircle size={20} /></div>
              <div className="step-content">
                <h4>Delivered</h4>
                <p>Pending</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
