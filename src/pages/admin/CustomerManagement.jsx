import React, { useState } from 'react';
import { Search, Mail, Ban, CheckCircle } from 'lucide-react';
import SEO from '../../components/SEO';
import './CustomerManagement.css';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for customers
  const [customers, setCustomers] = useState([
    { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', orders: 12, spent: 450.00, status: 'Active', joined: 'Jan 12, 2023' },
    { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', orders: 5, spent: 124.50, status: 'Active', joined: 'Mar 05, 2023' },
    { id: 'CUST-003', name: 'Mike Johnson', email: 'mike@example.com', orders: 1, spent: 18.99, status: 'Active', joined: 'Oct 23, 2023' },
    { id: 'CUST-004', name: 'Sarah Williams', email: 'sarah@example.com', orders: 3, spent: 89.00, status: 'Disabled', joined: 'Feb 14, 2023' },
    { id: 'CUST-005', name: 'David Brown', email: 'david@example.com', orders: 8, spent: 340.25, status: 'Active', joined: 'Jun 30, 2023' },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleStatus = (id) => {
    setCustomers(customers.map(customer => {
      if (customer.id === id) {
        return { ...customer, status: customer.status === 'Active' ? 'Disabled' : 'Active' };
      }
      return customer;
    }));
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm) || 
    customer.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="customer-management-page">
      <SEO title="Manage Customers | Admin" />
      
      <div className="admin-page-header">
        <h1>Customer Management</h1>
      </div>

      <div className="admin-card">
        <div className="table-controls">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={handleSearch}
              className="admin-search-input"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Joined Date</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className={customer.status === 'Disabled' ? 'disabled-row' : ''}>
                  <td>
                    <div className="customer-meta">
                      <div className="customer-avatar">{customer.name.charAt(0)}</div>
                      <strong>{customer.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <Mail size={14} />
                      <span>{customer.email}</span>
                    </div>
                  </td>
                  <td>{customer.joined}</td>
                  <td>{customer.orders}</td>
                  <td>${customer.spent.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${customer.status === 'Active' ? 'badge-delivered' : 'badge-cancelled'}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`action-btn status-btn ${customer.status === 'Active' ? 'suspend' : 'activate'}`}
                      onClick={() => toggleStatus(customer.id)}
                      title={customer.status === 'Active' ? 'Disable Account' : 'Activate Account'}
                    >
                      {customer.status === 'Active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                      {customer.status === 'Active' ? 'Disable' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="no-results">
            <p>No customers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
