// src/contexts/AppContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, getMyProfile } from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('products');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getMyProfile();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.code === product.code);
      if (exist) {
        return prev.map(item =>
          item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} añadido al carrito!`);
  };

  const removeFromCart = (productCode) => {
    setCartItems(prev => prev.filter(item => item.code !== productCode));
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const login = async (username, password) => {
    const response = await apiLogin(username, password);
    localStorage.setItem('token', response.data.token);
    const profileResponse = await getMyProfile();
    setUser(profileResponse.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    user,
    loading,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};