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
