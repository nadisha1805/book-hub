import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, ExternalLink } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import './OrderHistory.css';

const OrderHistory = () => {
  const { user } = useShop();

  // If user is not logged in, redirect to home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Mock order data
  const mockOrders = [
    {
      id: 'A1B2C3D4',
      date: 'Oct 21, 2023',
      total: 41.98,
      status: 'Shipped',
      items: [
        { title: 'The Silent Patient', author: 'Alex Michaelides', qty: 1, price: 18.99 },
        { title: 'Atomic Habits', author: 'James Clear', qty: 1, price: 22.99 }
      ]
    },
    {
      id: 'Z9Y8X7W6',
      date: 'Sep 15, 2023',
      total: 17.99,
      status: 'Delivered',
      items: [
        { title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', qty: 1, price: 17.99 }
      ]
    }
  ];

  return (
    <div className="order-history-page container">
      <SEO title="Order History" description="View your past orders and their status at Book Hub." />
      
      <div className="history-header">
        <h1>My Orders</h1>
        <p>Welcome back, {user.username}! Here is your recent order history.</p>
      </div>

      <div className="orders-list">
        {mockOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-meta">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">Placed on {order.date}</span>
              </div>
              <div className="order-status-wrapper">
                <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p>{item.author}</p>
                  </div>
                  <div className="item-qty">Qty: {item.qty}</div>
                  <div className="item-price">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <div className="order-total">
                Total: <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="order-actions">
                <Link to="/track-order" className="btn btn-outline btn-sm">Track Order</Link>
                <button className="btn btn-primary btn-sm">Buy Again</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
