import { createContext, useEffect, useState } from 'react'

export const BookContext = createContext()

export const BookContextProvider = ({ children }) => {
    const [allBooks, setAllBooks] = useState([]) // Rinomina per chiarezza
    const [filteredBooks, setFilteredBooks] = useState([]) // Stato per i libri filtrati
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [inputValue, setInputValue] = useState('')

    const getBooks = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/books?page=${page}&pageSize=${pageSize}`
            )
            const result = await response.json()
            setAllBooks(result) // Imposta i libri originali
            setFilteredBooks(result) // Imposta i libri filtrati inizialmente uguali a tutti
        } catch (error) {
            console.error(error.message)
        }
    }

    const filteredBook = () => {
        if (inputValue === '') {
            setFilteredBooks(allBooks) // Ritorna tutti i libri se non ci sono filtri
        } else {
            const filtered = allBooks.filter((book) =>
                book.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            setFilteredBooks(filtered) // Imposta i libri filtrati
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        filteredBook()
    }

    useEffect(() => {
        getBooks()
    }, [page, pageSize])

    return (
        <BookContext.Provider
            value={{
                allBooks,
                filteredBooks, // Fornisci i libri filtrati
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
