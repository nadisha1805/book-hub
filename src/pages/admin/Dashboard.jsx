import React from 'react';
import { Book, Users, ShoppingBag, DollarSign } from 'lucide-react';
import SEO from '../../components/SEO';
import './Dashboard.css';

const Dashboard = () => {
  // Mock stats
  const stats = [
    { title: 'Total Books', value: '1,245', icon: <Book size={24} />, color: '#3b82f6' },
    { title: 'Total Orders', value: '456', icon: <ShoppingBag size={24} />, color: '#10b981' },
    { title: 'Total Customers', value: '892', icon: <Users size={24} />, color: '#f59e0b' },
    { title: 'Total Revenue', value: '$24,590', icon: <DollarSign size={24} />, color: '#8b5cf6' },
  ];

  return (
    <div className="dashboard-page">
      <SEO title="Admin Dashboard | Book Hub" />
      
      <div className="admin-page-header">
        <h1>Dashboard Overview</h1>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card admin-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        <div className="admin-card recent-orders">
          <h3>Recent Orders</h3>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-8921</td>
                  <td>John Doe</td>
                  <td>Oct 24, 2023</td>
                  <td>$45.98</td>
                  <td><span className="badge badge-pending">Pending</span></td>
                </tr>
                <tr>
                  <td>#ORD-8920</td>
                  <td>Jane Smith</td>
                  <td>Oct 23, 2023</td>
                  <td>$124.50</td>
                  <td><span className="badge badge-shipped">Shipped</span></td>
                </tr>
                <tr>
                  <td>#ORD-8919</td>
                  <td>Mike Johnson</td>
                  <td>Oct 23, 2023</td>
                  <td>$18.99</td>
                  <td><span className="badge badge-delivered">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card low-stock">
          <h3>Low Stock Alerts</h3>
          <ul className="alert-list">
            <li>
              <div className="alert-info">
                <strong>The Silent Patient</strong>
                <span>Alex Michaelides</span>
              </div>
              <span className="alert-badge warning">3 Left</span>
            </li>
            <li>
              <div className="alert-info">
                <strong>Atomic Habits</strong>
                <span>James Clear</span>
              </div>
              <span className="alert-badge danger">Out of Stock</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
