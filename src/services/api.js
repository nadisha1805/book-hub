import axios from 'axios';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests if user is logged in
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data;
  },
  getProfile: async () => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};

export const bookAPI = {
  getAllBooks: async (keyword = '') => {
    const { data } = await api.get(`/books?keyword=${keyword}`);
    return data;
  },
  getBookById: async (id) => {
    const { data } = await api.get(`/books/${id}`);
    return data;
  },
  createBook: async (bookData) => {
    const { data } = await api.post('/books', bookData);
    return data;
  },
  updateBook: async (id, bookData) => {
    const { data } = await api.put(`/books/${id}`, bookData);
    return data;
  },
  deleteBook: async (id) => {
    const { data } = await api.delete(`/books/${id}`);
    return data;
  },
};

export const orderAPI = {
  createOrder: async (orderData) => {
    const { data } = await api.post('/orders', orderData);
    return data;
  },
  getOrderById: async (id) => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },
  getAllOrders: async () => {
    const { data } = await api.get('/orders');
    return data;
  },
};

export default api;
