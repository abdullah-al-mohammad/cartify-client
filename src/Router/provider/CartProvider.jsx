import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //  1. Initialize cart from localStorage immediately
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //  Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //  Add product to cart
  const addToCart = product => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);

      if (existing) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + product.qty } //  accumulate quantity
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: product.qty || 1, stock: product.stock || 10 }]; //  default qty = 1
      }
    });
  };

  //  Increment quantity
  const increment = (id, stock) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? (item.qty < stock ? { ...item, qty: item.qty + 1 } : item) : item
      )
    );
  };

  //  Decrement quantity
  const decrement = id => {
    setCart(prev =>
      prev
        .map(item => (item._id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 } : item))
        .filter(item => item.qty > 0)
    );
  };

  //  Remove item from cart
  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  //  Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); //  also clear from localStorage
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increment, decrement, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
