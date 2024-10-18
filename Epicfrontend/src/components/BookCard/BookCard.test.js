import '@testing-library/jest-dom'
import BookCard from '../BookCard/BookCard'
import { render, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SelectContextProvider } from '../context/SelectContext'
import { DarkModeContextProvider } from '../context/DarkModeContext'
import { BookContextProvider } from '../context/BookContext'

const mockBooks = [
    {
        asin: '12345',
        img: 'image1.jpg',
        category: 'Fiction',
        title: 'Book One',
        price: 19.99,
    },
    {
        asin: '67890',
        img: 'image2.jpg',
        category: 'Non-Fiction',
        title: 'Book Two',
        price: 29.99,
    },
]

describe('BookCard Tests', () => {
    it('renders the correct number of BookCards', () => {
        render(
            <MemoryRouter>
                <SelectContextProvider>
                    <DarkModeContextProvider>
                        <BookContextProvider value={{ books: mockBooks }}>
                            {mockBooks.map((book) => (
                                <BookCard
                                    key={book.asin}
                                    img={book.img}
                                    category={book.category}
                                    title={book.title}
                                    asin={book.asin}
                                    price={book.price}
                                />
                            ))}
                        </BookContextProvider>
                    </DarkModeContextProvider>
                </SelectContextProvider>
            </MemoryRouter>
        )

        const cards = screen.getAllByRole('img')
        expect(cards.length).toBe(mockBooks.length)
    })

    it('toggles selected-border on click', () => {
        render(
            <MemoryRouter>
                <SelectContextProvider>
                    <DarkModeContextProvider>
                        <BookContextProvider value={{ books: mockBooks }}>
                            {mockBooks.map((book) => (
                                <BookCard
                                    key={book.asin}
                                    img={book.img}
                                    category={book.category}
                                    title={book.title}
                                    asin={book.asin}
                                    price={book.price}
                                />
                            ))}
                        </BookContextProvider>
                    </DarkModeContextProvider>
                </SelectContextProvider>
            </MemoryRouter>
        )

        const firstCard = screen.getAllByRole('img')[0].closest('.card')
        const secondCard = screen.getAllByRole('img')[1].closest('.card')

        expect(firstCard).not.toHaveClass('selected-border')

        fireEvent.click(firstCard)

        expect(firstCard).toHaveClass('selected-border')

        fireEvent.click(secondCard)

        expect(firstCard).not.toHaveClass('selected-border')

        expect(secondCard).toHaveClass('selected-border')
    })
})
