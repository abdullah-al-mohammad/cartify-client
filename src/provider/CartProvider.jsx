import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = product => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);

      if (existing) {
        const finalQty = product.qty;

        if (finalQty > product.stock) {
          alert(`Only ${product.stock} items available.`);
          return prev;
        }

        return prev.map(item => (item._id === product._id ? { ...item, qty: finalQty } : item));
      }

      if (!existing && prev.length >= 5) {
        alert('You can only add 5 unique products to your cart.');
        return prev;
      }

      return [...prev, { ...product, qty: Math.min(product.qty, product.stock) }];
    });
  };

  const increment = (id, stock) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id && item.qty < stock ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrement = id => {
    setCart(prev =>
      prev
        .map(item => (item._id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 } : item))
        .filter(item => item.qty > 0)
    );
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
