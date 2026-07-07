import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X } from 'lucide-react';
import './LoginModal.css';

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useShop();
  const [username, setUsername] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closeLoginModal}>
          <X size={24} />
        </button>
        <h2>Welcome Back</h2>
        <p>Log in to access your cart and wishlist across devices.</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter any name (demo)"
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Any password works"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary login-submit-btn">
            Log In
          </button>
        </form>
        <div className="modal-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
