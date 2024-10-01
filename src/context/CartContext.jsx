import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load initial state from local storage if available
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Effect to sync cart with local storage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart (with id and size)
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item with same id and size exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist in the cart
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Remove specific item from cart (by id and size)
  const removeFromCart = (itemId, itemSize) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === itemId && item.size === itemSize))
    );
  };

  // Update item quantity
  const updateCartItemQuantity = (itemId, itemSize, newQuantity) => {
    if (newQuantity < 0) return; // Prevent setting negative quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.size === itemSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Memoize the context value
  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  }), [cartItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
