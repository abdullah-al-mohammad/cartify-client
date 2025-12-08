import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

/** ---------------------------
 * Cart Provider
 * --------------------------- */
export const CartProvider = ({ children }) => {
  /** Load cart from localStorage on first render */
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  /** Sync cart to localStorage */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /** ---------------------------
   * Add product to cart
   * --------------------------- */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      const isNew = !existing;

      // Limit: Max 5 UNIQUE products
      if (isNew && prev.length >= 5) {
        alert("You can only add 5 unique products to your cart.");
        return prev;
      }

      // If product already exists → update quantity
      if (existing) {
        const finalQty = product.qty;

        // Prevent stock overflow
        if (finalQty > product.stock) {
          alert(`Only ${product.stock} items available.`);
          return prev;
        }

        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: finalQty }
            : item
        );
      }

      // Add new product (minimum between qty and stock)
      return [...prev, { ...product, qty: Math.min(product.qty, product.stock) }];
    });
  };

  /** ---------------------------
   * Increase quantity
   * --------------------------- */
  const increment = (id, stock) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.qty < stock
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  /** ---------------------------
   * Decrease quantity
   * --------------------------- */
  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  /** ---------------------------
   * Remove product completely
   * --------------------------- */
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  /** ---------------------------
   * Clear whole cart
   * --------------------------- */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
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

/** Custom hook for using cart */
export const useCart = () => useContext(CartContext);
