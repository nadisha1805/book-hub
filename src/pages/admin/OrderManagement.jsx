import React from 'react';
import SEO from '../../components/SEO';

const OrderManagement = () => {
  return (
    <div>
      <SEO title="Manage Orders | Admin" />
      <div className="admin-page-header">
        <h1>Order Management</h1>
      </div>
      <div className="admin-card">
        <p>Order management interface will be connected to the backend API here.</p>
      </div>
    </div>
  );
};

export default OrderManagement;
