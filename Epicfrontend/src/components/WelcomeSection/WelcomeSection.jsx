/*
import { useContext, useEffect, useState } from 'react'
import './WelcomeSection.css'
import { DarkModeContext } from '../context/DarkModeContext'
import { BookContext } from '../context/BookContext'
//TODO: dettagli aggiugere o togiere
const WelcomeSection = ({ sweetAlert }) => {
    const { allBooks: books } = useContext(BookContext)
    const { isDark } = useContext(DarkModeContext)
    const [randomBook, setRandomBook] = useState(null)

    useEffect(() => {
        if (books?.books && books.books.length > 0) {
            const randomIndex = Math.floor(Math.random() * books.books.length)
            setRandomBook(books.books[randomIndex])
        }
    }, [books.books])

    return (
        <div className={`text-center py-5 ${isDark ? 'bg-dark' : 'bg-light'}`}>
            <div className="container pt-5 pb-5">
                <div className="row pt-5 pb-5">
                    <div className="col-lg-12 col-xl-12 ms-auto pb-5 pt-5">
                        <span>{randomBook?.category}</span>
                        <h1
                            className={`display-3 fw-bold mb-3 ${isDark ? 'text-white' : 'text-dark'}`}
                        >
                            Libro Del Giorno
                        </h1>

                        <div className="custom-img">
                            <img src={randomBook?.img} alt="imagine" />
                        </div>

                        <p className="lead mb-3">{randomBook?.title}</p>

                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <button
                                onClick={sweetAlert}
                                className="btn btn-info text-white"
                            >
                                Acquista a: {randomBook?.price.$numberDecimal}£
                            </button>

                            <button className="btn btn-warning text-white">
                                Dettagli
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSection
*/

import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import './WelcomeSection.css'
import { DarkModeContext } from '../context/DarkModeContext'
import { BookContext } from '../context/BookContext'
import { CartContext } from '../context/CardContext'

const WelcomeSection = ({ sweetAlert }) => {
    const { allBooks: books } = useContext(BookContext)
    const { isDark } = useContext(DarkModeContext)
    const { addToCart } = useContext(CartContext)
    const [randomBook, setRandomBook] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (books?.books && books.books.length > 0) {
            const randomIndex = Math.floor(Math.random() * books.books.length)
            setRandomBook(books.books[randomIndex])
        }
    }, [books.books])

    const redirectDetails = () => {
        navigate(`/book/${randomBook?._id}`)
    }

    const handleBuy = () => {
        if (randomBook) {
            addToCart(randomBook)
            Swal.fire({
                title: 'Aggiunto al carrello',
                text: `Hai aggiunto "${randomBook.title}" al carrello.`,
                icon: 'success',
                confirmButtonText: 'Ok',
            })
        }
    }

    return (
        <div className={`text-center py-5 ${isDark ? 'bg-dark' : 'bg-light'}`}>
            <div className="container pt-5 pb-5">
                <div className="row pt-5 pb-5">
                    <div className="col-lg-12 col-xl-12 ms-auto pb-5 pt-5">
                        <span>{randomBook?.category}</span>
                        <h1
                            className={`display-3 fw-bold mb-3 ${isDark ? 'text-white' : 'text-dark'}`}
                        >
                            Libro Del Giorno
                        </h1>

                        <div className="custom-img">
                            <img src={randomBook?.img} alt="imagine" />
                        </div>

                        <p className="lead mb-3">{randomBook?.title}</p>

                        <div className="d-flex justify-content-center align-items-center gap-3">
                            <button
                                onClick={handleBuy}
                                className="btn btn-info text-white"
                            >
                                Acquista a: {randomBook?.price.$numberDecimal}£
                            </button>

                            <button
                                onClick={redirectDetails}
                                className="btn btn-warning text-white"
                            >
                                Dettagli
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSection
