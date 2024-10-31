/*import { createContext, useEffect, useState } from 'react'
import { RoseSharp } from 'react-ionicons'

export const BookContext = createContext()
export const BookContextProvider = ({ children }) => {
    const [allBooks, setAllBooks] = useState({ books: [], totalPages: 0 }) // Inizializza allBooks come oggetto
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [inputValue, setInputValue] = useState('')

    const getBooks = async () => {
        let url = `${import.meta.env.VITE_SERVER_BASE_URL}/books?page=${page}&pageSize=${pageSize}`

        if (inputValue.trim() !== '') {
            url = `${import.meta.env.VITE_SERVER_BASE_URL}/books/${inputValue}?page=${page}&pageSize=${pageSize}` // Correggi l'URL per includere la paginazione anche nella ricerca per titolo
        }

        try {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json()

                // Imposta i libri a seconda della ricerca
                setAllBooks(result) // Imposta tutto il risultato, inclusi libri e totalPages
            } else {
                const errorResult = await response.json()
                console.error('Errore nella risposta:', errorResult.message)
            }
        } catch (error) {
            console.error('Errore nel fetch:', error.message)
        }
    }

    const seachBookTitle = async (inputValue, page, pageSize) => {
        try {
            let url = `${import.meta.env.VITE_SERVER_BASE_URL}/books/title/${inputValue}?page=${page}&pageSize=${pageSize}`
            const response = await fetch(url)
            const result = await response.json()

            if (response.ok) {
                setAllBooks({
                    books: result.books,
                    totalPages: result.totalPages,
                })
            } else {
                console.error(result.message)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (inputValue.trim().toLowerCase() !== '') {
            // Correzione qui
            seachBookTitle(inputValue, page, pageSize)
        } else {
            getBooks(page, pageSize) // Recupera i libri al momento dell'invio del modulo
        }
    }

    useEffect(() => {
        if (inputValue.trim().toLowerCase() === '') {
            // Correzione qui
            getBooks(page, pageSize)
        }
    }, [page, pageSize]) // Effettua il recupero dei libri quando cambia pagina o dimensione pagina

    return (
        <BookContext.Provider
            value={{
                allBooks,
                inputValue,
                handleInputChange,
                handleSubmitForm,
                page,
                setPage,
                pageSize,
                setPageSize,
            }}
        >
            {children}
        </BookContext.Provider>
    )
}
*/

import { createContext, useEffect, useState } from 'react'

export const BookContext = createContext()

export const BookContextProvider = ({ children }) => {
    const [allBooks, setAllBooks] = useState({ books: [], totalPages: 0 })
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [inputValue, setInputValue] = useState('')

    const buildUrl = (endpoint) => {
        return `${import.meta.env.VITE_SERVER_BASE_URL}${endpoint}?page=${page}&pageSize=${pageSize}`
    }

    const fetchBooks = async (url) => {
        try {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json()
                setAllBooks(result)
            } else {
                const errorResult = await response.json()
                console.error('Errore nella risposta:', errorResult.message)
            }
        } catch (error) {
            console.error('Errore nel fetch:', error.message)
        }
    }

    const getBooks = () => {
        const url = buildUrl(`/books`)
        fetchBooks(url)
    }

    const searchBookTitle = () => {
        const trimmedInput = inputValue.trim().toLowerCase()
        if (trimmedInput) {
            const url = buildUrl(`/books/title/${trimmedInput}`)
            fetchBooks(url)
        } else {
            getBooks()
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        searchBookTitle()
    }

    useEffect(() => {
        if (!inputValue.trim()) getBooks()
    }, [page, pageSize, inputValue])

    return (
        <BookContext.Provider
            value={{
                allBooks,
                inputValue,
                handleInputChange,
                handleSubmitForm,
                page,
                setPage,
                pageSize,
                setPageSize,
            }}
        >
            {children}
        </BookContext.Provider>
    )
}
