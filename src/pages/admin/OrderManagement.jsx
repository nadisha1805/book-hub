import React, { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import SEO from '../../components/SEO';
import './OrderManagement.css';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for orders
  const [orders, setOrders] = useState([
    { id: 'ORD-8921', customer: 'John Doe', date: 'Oct 24, 2023', total: 45.98, status: 'Pending', items: 2 },
    { id: 'ORD-8920', customer: 'Jane Smith', date: 'Oct 23, 2023', total: 124.50, status: 'Shipped', items: 5 },
    { id: 'ORD-8919', customer: 'Mike Johnson', date: 'Oct 23, 2023', total: 18.99, status: 'Delivered', items: 1 },
    { id: 'ORD-8918', customer: 'Sarah Williams', date: 'Oct 22, 2023', total: 89.00, status: 'Processing', items: 3 },
    { id: 'ORD-8917', customer: 'David Brown', date: 'Oct 21, 2023', total: 230.75, status: 'Cancelled', items: 6 },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm) || 
    order.customer.toLowerCase().includes(searchTerm)
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'badge-pending';
      case 'Processing': return 'badge-processing';
      case 'Shipped': return 'badge-shipped';
      case 'Delivered': return 'badge-delivered';
      case 'Cancelled': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  };

  return (
    <div className="order-management-page">
      <SEO title="Manage Orders | Admin" />
      
      <div className="admin-page-header">
        <h1>Order Management</h1>
        <button className="btn btn-outline d-flex align-items-center gap-2">
          <Filter size={18} /> Filter Orders
        </button>
      </div>

      <div className="admin-card">
        <div className="table-controls">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
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
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.date}</td>
                  <td>{order.customer}</td>
                  <td>{order.items} items</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view-btn" title="View Details">
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="no-results">
            <p>No orders found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
