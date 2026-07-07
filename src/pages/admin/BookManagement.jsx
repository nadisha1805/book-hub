import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import SEO from '../../components/SEO';
import { books } from '../../data/mockData';
import './BookManagement.css';

const BookManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookList, setBookList] = useState(books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  });

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

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      stock: book.id % 2 === 0 ? 45 : 3, // mock stock
      image: book.image
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      category: '',
      price: '',
      stock: '',
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingBook) {
      // Update
      setBookList(bookList.map(b => b.id === editingBook.id ? { ...b, ...formData, price: Number(formData.price) } : b));
    } else {
      // Add
      const newBook = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        rating: 5,
        reviews: 0
      };
      setBookList([newBook, ...bookList]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="book-management-page">
      <SEO title="Manage Books | Admin" />
      
      <div className="admin-page-header">
        <h1>Book Management</h1>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAdd}>
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
                      <button className="action-btn edit" onClick={() => handleEdit(book)} title="Edit">
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

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-form-group">
                <label>Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="admin-form-group">
                <label>Author</label>
                <input required type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="admin-form-group">
                  <label>Category</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="admin-form-group">
                  <label>Price ($)</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="admin-form-group">
                  <label>Stock Quantity</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
                <div className="admin-form-group">
                  <label>Image URL</label>
                  <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingBook ? 'Save Changes' : 'Add Book'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
