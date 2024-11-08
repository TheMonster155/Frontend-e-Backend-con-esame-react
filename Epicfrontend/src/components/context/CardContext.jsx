/*
import React, { createContext, useState, useEffect } from 'react'

// Crea il contesto per il carrello
const CartContext = createContext()

// Provider del contesto
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    // Logica per calcolare il prezzo totale del carrello
    useEffect(() => {
        const price = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )
        setTotalPrice(price)
    }, [cartItems])

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
export { CartContext, CartProvider }
*/

import { createContext, useState } from 'react'

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }])
    }

    const clearCart = () => {
        setCartItems([])
    }

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, totalPrice, clearCart }}
        >
            {children}
        </CartContext.Provider>
    )
}
export { CartContext, CartProvider }
