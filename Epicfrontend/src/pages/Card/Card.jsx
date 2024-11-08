/*import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../components/context/CardContext' // Importa correttamente il CartContext

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const response = await fetch('/cart/checkout', {
                method: 'POST',
                body: JSON.stringify({ userId: 'userId' }), // Passa l'ID dell'utente
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Error during checkout', error)
        }
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.bookId}>
                                {item.bookId.title} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${totalPrice}</p>
                    <button onClick={handleCheckout}>
                        Checkout with Stripe
                    </button>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    )
}

export default Cart
*/
/*
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../components/context/CardContext'

const Cart = () => {
    const context = useContext(CartContext)
    if (!context) {
        console.error('CartContext is not available')
        return <div>Context is not available</div>
    }

    const { cartItems, totalPrice, clearCart } = context
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const response = await fetch('/cart/checkout', {
                method: 'POST',
                body: JSON.stringify({ userId: 'userId' }),
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Error during checkout', error)
        }
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.bookId}>
                                {item.bookId.title} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${totalPrice}</p>
                    <button onClick={handleCheckout}>
                        Checkout with Stripe
                    </button>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    )
}

export default Cart
*/

import React, { useContext } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { CartContext, CartProvider } from '../../components/context/CardContext'

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const response = await fetch('/cart/checkout', {
                method: 'POST',
                body: JSON.stringify({ userId: 'userId' }),
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (error) {
            console.error('Error during checkout', error)
        }
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id}>
                                {item.title} x {item.quantity} - $
                                {item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${totalPrice}</p>
                    <button onClick={handleCheckout}>
                        Checkout with Stripe
                    </button>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    )
}

export default Cart
