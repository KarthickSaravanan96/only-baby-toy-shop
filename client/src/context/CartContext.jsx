import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Use _id (MongoDB) or id, whichever exists
    const getId = (product) => product._id || product.id;

    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => getId(item) === getId(product));
            if (existing) {
                return prev.map(item =>
                    getId(item) === getId(product)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => getId(item) !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) { removeFromCart(productId); return; }
        setCartItems(prev =>
            prev.map(item => getId(item) === productId ? { ...item, quantity } : item)
        );
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const getCartCount = () =>
        cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
