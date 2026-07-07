import React, { useState } from 'react';
import { Search, Eye, Filter, X } from 'lucide-react';
import SEO from '../../components/SEO';
import './OrderManagement.css';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  // Mock data for orders
  const [orders, setOrders] = useState([
    { id: 'ORD-8921', customer: 'John Doe', email: 'john@example.com', date: 'Oct 24, 2023', total: 45.98, status: 'Pending', items: 2, address: '123 Main St, NY, 10001' },
    { id: 'ORD-8920', customer: 'Jane Smith', email: 'jane@example.com', date: 'Oct 23, 2023', total: 124.50, status: 'Shipped', items: 5, address: '456 Park Ave, CA, 90210' },
    { id: 'ORD-8919', customer: 'Mike Johnson', email: 'mike@example.com', date: 'Oct 23, 2023', total: 18.99, status: 'Delivered', items: 1, address: '789 Oak Ln, TX, 75001' },
    { id: 'ORD-8918', customer: 'Sarah Williams', email: 'sarah@example.com', date: 'Oct 22, 2023', total: 89.00, status: 'Processing', items: 3, address: '321 Pine St, FL, 33101' },
    { id: 'ORD-8917', customer: 'David Brown', email: 'david@example.com', date: 'Oct 21, 2023', total: 230.75, status: 'Cancelled', items: 6, address: '654 Elm St, WA, 98101' },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleView = (order) => {
    setViewingOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setOrders(orders.map(o => o.id === viewingOrder.id ? { ...o, status: newStatus } : o));
    setViewingOrder({ ...viewingOrder, status: newStatus });
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
                    <span className={`admin-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view-btn" onClick={() => handleView(order)} title="View Details">
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

      {/* View Order Modal */}
      {isModalOpen && viewingOrder && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Order Details: {viewingOrder.id}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="admin-modal-body" style={{ padding: '1.5rem' }}>
              <div className="order-details-grid">
                <div className="detail-group">
                  <strong>Customer Name:</strong>
                  <p>{viewingOrder.customer}</p>
                </div>
                <div className="detail-group">
                  <strong>Email Address:</strong>
                  <p>{viewingOrder.email}</p>
                </div>
                <div className="detail-group">
                  <strong>Order Date:</strong>
                  <p>{viewingOrder.date}</p>
                </div>
                <div className="detail-group">
                  <strong>Total Items:</strong>
                  <p>{viewingOrder.items} items</p>
                </div>
                <div className="detail-group">
                  <strong>Total Amount:</strong>
                  <p>${viewingOrder.total.toFixed(2)}</p>
                </div>
                <div className="detail-group">
                  <strong>Shipping Address:</strong>
                  <p>{viewingOrder.address}</p>
                </div>
                <div className="detail-group full-width" style={{ marginTop: '1rem' }}>
                  <strong>Update Status:</strong>
                  <select 
                    value={viewingOrder.status} 
                    onChange={handleStatusChange}
                    className="admin-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
