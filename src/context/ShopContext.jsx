import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => {
  return useContext(ShopContext);
};

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('bookhub_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('bookhub_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bookhub_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('bookhub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bookhub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('bookhub_user', JSON.stringify(user));
  }, [user]);

  // Cart operations
  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
  const toggleWishlist = (book) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === book.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== book.id);
      }
      return [...prevWishlist, book];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  // Auth operations
  const login = (username) => {
    setUser({ username });
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };
  
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Derived state
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    wishlist,
    user,
    cartTotal,
    cartCount,
    isLoginModalOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    login,
    logout,
    openLoginModal,
    closeLoginModal
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
