import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (course) => {
        // Kiểm tra nếu khóa học đã tồn tại trong giỏ hàng
        if (!cart.some((item) => item.id === course.id)) {
            setCart((prevCart) => [...prevCart, course]);
        }
    };

    const removeFromCart = (courseId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== courseId));
    };

    return (
        <CartContext.Provider value={{ cart, setCart,addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);