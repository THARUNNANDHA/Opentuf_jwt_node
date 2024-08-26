import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setcartCount] = useState(0)
    const [cartItems, setCartItems] = useState(new Map());
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartCount, setcartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext)