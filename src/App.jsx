import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import FAQ from './pages/FAQ';
import BookDetail from './pages/BookDetail';
import { ShopProvider } from './context/ShopContext';
import LoginModal from './components/LoginModal';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <ShopProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/book/:id" element={<BookDetail />} />
            </Routes>
          </main>
          <Footer />
          <LoginModal />
        </div>
      </Router>
      </ShopProvider>
    </HelmetProvider>
  );
}

export default App;
