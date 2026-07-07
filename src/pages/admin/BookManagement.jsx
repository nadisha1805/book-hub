import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import SEO from '../../components/SEO';
import { books } from '../../data/mockData';
import './BookManagement.css';

const BookManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookList, setBookList] = useState(books);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = books.filter(book => 
      book.title.toLowerCase().includes(term) || 
      book.author.toLowerCase().includes(term)
    );
    setBookList(filtered);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBookList(bookList.filter(book => book.id !== id));
    }
  };

  return (
    <div className="book-management-page">
      <SEO title="Manage Books | Admin" />
      
      <div className="admin-page-header">
        <h1>Book Management</h1>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Add New Book
        </button>
      </div>

      <div className="admin-card">
        <div className="table-controls">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search books by title or author..." 
              value={searchTerm}
              onChange={handleSearch}
              className="admin-search-input"
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table book-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title & Author</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book) => (
                <tr key={book.id}>
                  <td>
                    <img src={book.image} alt={book.title} className="table-img" />
                  </td>
                  <td>
                    <div className="book-meta">
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                    </div>
                  </td>
                  <td>{book.category}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>
                    {book.id % 2 === 0 ? (
                      <span className="stock-badge in-stock">45</span>
                    ) : (
                      <span className="stock-badge low-stock">3</span>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-published">Published</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(book.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {bookList.length === 0 && (
          <div className="no-results">
            <p>No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookManagement;
