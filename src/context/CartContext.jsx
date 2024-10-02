import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use Cart Context
export const useCart = () => {
    return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Get cart items from localStorage on initial render
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Effect to update localStorage whenever cartItems change
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
                // If the item already exists in the cart, update its quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += newItem.quantity || 1;
                return updatedItems;
            } else {
                // If it's a new item, add it to the cart with a specified quantity
                return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }];
            }
        });
    };

    // Remove specific item from cart (by id and size)
    const removeFromCart = (itemId, itemSize) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter(
                (item) => !(item.id === itemId && item.size === itemSize)
            );

            if (updatedItems.length === prevItems.length) {
                console.warn(`Item with id: ${itemId} and size: ${itemSize} not found in cart.`);
            }

            return updatedItems;
        });
    };

    // Update item quantity, ensuring it doesn't go below 1
    const updateCartItemQuantity = (itemId, itemSize, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId && item.size === itemSize
                    ? { ...item, quantity: Math.max(newQuantity, 1) } // Prevent quantity from going below 1
                    : item
            )
        );
    };

    // Clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
