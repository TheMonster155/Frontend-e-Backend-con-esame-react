import { createContext, useState } from 'react'
import fantasy from '../dataSource/books/fantasy.json'
import history from '../dataSource/books/history.json'
import horror from '../dataSource/books/horror.json'
import romance from '../dataSource/books/romance.json'
import scifi from '../dataSource/books/scifi.json'

export const BookContext = createContext()

export const BookContextProvider = ({ children }) => {
    const allBooks = [...fantasy, ...history, ...romance, ...horror, ...scifi]
    const [books, setBooks] = useState(fantasy)
    const [inputValue, setInputValue] = useState('')

    const filteredBook = () => {
        if (inputValue === '') {
            setBooks(allBooks)
        } else {
            const filteredBooks = allBooks.filter((book) =>
                book.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            setBooks(filteredBooks)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        filteredBook()
    }

    return (
        <BookContext.Provider
            value={{ books, inputValue, handleInputChange, handleSubmitForm }}
        >
            {children}
        </BookContext.Provider>
    )
}
