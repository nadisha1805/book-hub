import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import SEO from '../../components/SEO';
import { categories } from '../../data/mockData';
import './CategoryManagement.css';

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryList, setCategoryList] = useState(categories);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories.filter(category => 
      category.name.toLowerCase().includes(term)
    );
    setCategoryList(filtered);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all books under it.')) {
      setCategoryList(categoryList.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="category-management-page">
      <SEO title="Manage Categories | Admin" />
      
      <div className="admin-page-header">
        <h1>Category Management</h1>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="admin-card">
        <div className="table-controls">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={handleSearch}
              className="admin-search-input"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table category-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Category Name</th>
                <th>Total Books</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category) => (
                <tr key={category.id}>
                  <td>
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="table-img-landscape" />
                    ) : (
                      <div className="placeholder-img">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{category.name}</strong>
                  </td>
                  <td>
                    <span className="count-badge">{category.count} Books</span>
                  </td>
                  <td>
                    <span className="badge badge-published">Active</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(category.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {categoryList.length === 0 && (
          <div className="no-results">
            <p>No categories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
