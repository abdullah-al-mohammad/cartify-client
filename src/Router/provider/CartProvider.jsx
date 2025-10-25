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
  // const addToCart = product => {
  //   setCart(prevCart => {
  //     const existing = prevCart.find(item => item._id === product._id);
  //     if (existing) {
  //       // If quantity is decreasing, just update (no alert)
  //       if (product.qty <= existing.qty) {
  //         return prevCart.map(item =>
  //           item._id === product._id ? { ...item, qty: product.qty } : item
  //         );
  //       }
  //       // If quantity is increasing, ensure it doesn't exceed stock
  //       const newQty = existing.qty + product.qty;
  //       if (newQty > product.stock) {
  //         alert(`stock Out`);
  //         return prevCart;
  //       }
  //       return prevCart.map(item => (item._id === product._id ? { ...item, qty: newQty } : item));
  //     } else {
  //       return [...prevCart, { ...product, qty: Math.min(product.qty, product.stock) }];
  //     }
  //   });
  // };
  const addToCart = product => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);

      if (existing) {
        const newQty = product.qty; // treat as final quantity, not addition

        // Decreasing or equal — just update
        if (newQty <= existing.qty) {
          return prevCart.map(item => (item._id === product._id ? { ...item, qty: newQty } : item));
        }

        //Increasing — check stock before updating
        if (newQty > product.stock) {
          alert(`Only ${product.stock} items available in stock.`);
          return prevCart;
        }

        return prevCart.map(item => (item._id === product._id ? { ...item, qty: newQty } : item));
      }

      // New product
      return [...prevCart, { ...product, qty: Math.min(product.qty, product.stock) }];
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
