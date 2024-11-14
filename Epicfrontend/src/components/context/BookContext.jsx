

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
        if (inputValue.trim().toLocaleLowerCase() === '') {
            getBooks()
        } else {
            searchBookTitle()
        }
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
