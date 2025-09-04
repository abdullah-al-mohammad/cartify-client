import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Increment quantity
  const increment = (id, stock) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? item.qty < stock
            ? { ...item, qty: item.qty + 1 }
            : item // can't exceed stock
          : item
      )
    );
  };

  // Decrement quantity
  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 }
            : item
        )
        .filter((item) => item.qty > 0) // remove if qty=0
    );
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increment, decrement, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
