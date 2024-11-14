
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../components/context/CardContext'
import { useUserContext } from '../../components/context/UserContext'
import Swal from 'sweetalert2'
import './Card.css'

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext)
    const { user } = useUserContext() 
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
                `${import.meta.env.VITE_SERVER_BASE_URL}/cart/add/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ userId: user._id, items }),
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const data = await response.json()
            console.log('Response from server:', data) 

            if (response.ok) {
          
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
