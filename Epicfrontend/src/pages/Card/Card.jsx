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
/*
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
                                {item.title} x {item.quantity || 1} - $
                                {(item.price || 0) * (item.quantity || 1)}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${totalPrice}</p>
                    <button onClick={handleCheckout}>Buy</button>
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
import Swal from 'sweetalert2'
import './Card.css'
const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const response = await fetch('/cart/checkout', {
                method: 'POST',
                body: JSON.stringify({ userId: 'userId' }), // Assicurati di passare l'ID dell'utente dinamicamente
                headers: { 'Content-Type': 'application/json' },
            })
            const data = await response.json()

            if (data.url) {
                // Mostra l'alert con SweetAlert
                Swal.fire({
                    title: 'Acquisto effettuato!',
                    text: 'Il pagamento è stato completato con successo.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Reindirizza alla home dopo che l'utente clicca su "OK"
                    clearCart() // Pulisce il carrello
                    navigate('/') // Naviga alla home
                })
            }
        } catch (error) {
            console.error('Errore durante il checkout', error)
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
                                {item.title} x {item.quantity || 1} - $
                                {(item.price || 0) * (item.quantity || 1)}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${totalPrice}</p>
                    <button onClick={handleCheckout}>Buy</button>
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
import Swal from 'sweetalert2'
import './Card.css'

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/api/cart/add/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ userId: 'userId' }), // Assicurati di passare l'ID dell'utente dinamicamente
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const data = await response.json()

            if (data.url) {
                // Mostra l'alert con SweetAlert
                Swal.fire({
                    title: 'Acquisto effettuato!',
                    text: 'Il pagamento è stato completato con successo.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Reindirizza alla home dopo che l'utente clicca su "OK"
                    clearCart() // Pulisce il carrello
                    navigate('/') // Naviga alla home
                })
            }
        } catch (error) {
            console.error('Errore durante il checkout', error)
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="cart-items">
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li
                                    key={item._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>
                                        {item.title} x {item.quantity || 1}
                                    </span>
                                    <span>
                                        $
                                        {(item.price || 0) *
                                            (item.quantity || 1)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <h4>Total: ${totalPrice}</h4>
                        <button
                            className="btn btn-primary"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    Your cart is empty
                </div>
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
import { UserContext } from '../../components/context/UserContext' // Importa il contesto dell'utente
import Swal from 'sweetalert2'
import './Card.css'

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const { userId } = useContext(UserContext) // Recupera l'ID utente dal contesto
    const navigate = useNavigate()

    const handleCheckout = async () => {
        try {
            // Usa l'ID dell'utente dinamicamente
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/cart/add/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ userId }), // Passa l'ID utente dinamicamente
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const data = await response.json()

            if (data.url) {
                // Mostra l'alert con SweetAlert
                Swal.fire({
                    title: 'Acquisto effettuato!',
                    text: 'Il pagamento è stato completato con successo.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    // Reindirizza alla home dopo che l'utente clicca su "OK"
                    clearCart() // Pulisce il carrello
                    navigate('/') // Naviga alla home
                })
            }
        } catch (error) {
            console.error('Errore durante il checkout', error)
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="cart-items">
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li
                                    key={item._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>
                                        {item.title} x {item.quantity || 1}
                                    </span>
                                    <span>
                                        $
                                        {(item.price || 0) *
                                            (item.quantity || 1)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <h4>Total: ${totalPrice}</h4>
                        <button
                            className="btn btn-primary"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    Your cart is empty
                </div>
            )}
        </div>
    )
}

export default Cart
*/

/*
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../components/context/CartContext'
import { useUserContext } from '../../components/context/UserContext'
import Swal from 'sweetalert2'
import './Card.css'

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const { user } = useUserContext() // Recupera il contesto utente
    const navigate = useNavigate()

    if (!user) {
        return (
            <div>
                <h1>Devi essere loggato per visualizzare il carrello</h1>
                <button onClick={() => navigate('/login')}>Vai al login</button>
            </div>
        )
    }

    const handleCheckout = async () => {
        try {
            const items = cartItems.map((item) => ({
                bookId: item._id,
                quantity: item.quantity || 1,
            }))

            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/cart/add`,
                {
                    method: 'POST',
                    body: JSON.stringify({ userId: user._id, items }),
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const data = await response.json()

            if (data.statusCode === 200) {
                Swal.fire({
                    title: 'Acquisto effettuato!',
                    text: 'Il pagamento è stato completato con successo.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    clearCart()
                    navigate('/')
                })
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Errore durante il checkout', error)
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="cart-items">
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li
                                    key={item._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>
                                        {item.title} x {item.quantity || 1}
                                    </span>
                                    <span>
                                        $
                                        {(item.price || 0) *
                                            (item.quantity || 1)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <h4>Total: ${totalPrice}</h4>
                        <button
                            className="btn btn-primary"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    Your cart is empty
                </div>
            )}
        </div>
    )
}

export default Cart
*/

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../components/context/CardContext'
import { useUserContext } from '../../components/context/UserContext'
import Swal from 'sweetalert2'
import './Card.css'

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const { user } = useUserContext() // Recupera l'oggetto utente dal contesto
    const navigate = useNavigate()

    // Se l'utente non è loggato, mostra un messaggio o blocca l'accesso al carrello
    if (!user) {
        return (
            <div>
                <h1>Devi essere loggato per visualizzare il carrello</h1>
                <button onClick={() => navigate('/login')}>Vai al login</button>
            </div>
        )
    }

    const handleCheckout = async () => {
        try {
            const items = cartItems.map((item) => ({
                bookId: item._id,
                quantity: item.quantity || 1,
            }))

            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/cart/add/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ userId: user._id, items }),
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const data = await response.json()
            console.log('Response from server:', data) // Log per vedere cosa restituisce il server

            if (response.ok) {
                // Se la risposta è positiva
                Swal.fire({
                    title: 'Acquisto effettuato!',
                    text: 'I libri sono stati aggiunti al carrello con successo.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    clearCart()
                    navigate('/')
                })
            } else {
                // Se la risposta del server è un errore
                Swal.fire({
                    title: 'Errore',
                    text: 'Si è verificato un errore durante il checkout.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            }
        } catch (error) {
            console.error('Errore durante il checkout', error)
            Swal.fire({
                title: 'Errore',
                text: 'Si è verificato un errore imprevisto.',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    }
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="cart-items">
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li
                                    key={item._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span>
                                        {item.title} x {item.quantity || 1}
                                    </span>
                                    <span>
                                        $
                                        {(item.price || 0) *
                                            (item.quantity || 1)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <h4>Total: ${totalPrice}</h4>
                        <button
                            className="btn btn-primary"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <div className="alert alert-warning text-center" role="alert">
                    Your cart is empty
                </div>
            )}
        </div>
    )
}

export default Cart
