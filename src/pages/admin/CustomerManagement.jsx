import React from 'react';
import SEO from '../../components/SEO';

const CustomerManagement = () => {
  return (
    <div>
      <SEO title="Manage Customers | Admin" />
      <div className="admin-page-header">
        <h1>Customer Management</h1>
      </div>
      <div className="admin-card">
        <p>Customer management interface will be connected to the backend API here.</p>
      </div>
    </div>
  );
};

export default CustomerManagement;
