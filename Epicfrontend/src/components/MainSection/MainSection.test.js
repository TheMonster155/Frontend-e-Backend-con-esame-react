/*
import '@testing-library/jest-dom'
const mockBooks = [
    {
        asin: '123',
        title: 'Libro 1',
        price: '10.00',
        category: 'Fiction',
        img: 'image1.jpg',
    },
    {
        asin: '456',
        title: 'Libro 2',
        price: '15.00',
        category: 'Non-Fiction',
        img: 'image2.jpg',
    },
]

const mockBookContextValue = {
    books: mockBooks,
}

const mockDarkModeContextValue = {
    isDark: false,
}

const mockSetSelectAsin = jest.fn()

describe('MainSection', () => {
    it('should not select a book  ', () => {
        const selectContextValue = {
            selectAsin: null,
            setSelectAsin: mockSetSelectAsin,
        }

        expect(selectContextValue.selectAsin).toBeNull()
    })

    it('should call setSelectAsin when clicking on a book', () => {
        const selectContextValue = {
            selectAsin: null,
            setSelectAsin: mockSetSelectAsin,
        }

        selectContextValue.setSelectAsin('123')

        expect(mockSetSelectAsin).toHaveBeenCalledWith('123')
    })

    it('should make null selectAsin initially', () => {
        const selectContextValue = {
            selectAsin: null,
            setSelectAsin: mockSetSelectAsin,
        }

        expect(selectContextValue.selectAsin).toBeNull()
    })

    it('should load reviews at the click of a book', () => {
        const selectContextValue = {
            selectAsin: null,
            setSelectAsin: mockSetSelectAsin,
        }

        selectContextValue.setSelectAsin('123')

        expect(mockSetSelectAsin).toHaveBeenCalledWith('123')
    })
})
*/

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MainSection from '../../components/MainSection/MainSection'
import { MemoryRouter } from 'react-router-dom'
import { BookContext } from '../context/BookContext'
import { DarkModeContext } from '../context/DarkModeContext'
import { SelectContext } from '../context/SelectContext'

const mockBooks = [
    {
        asin: '123',
        title: 'Test Book 1',
        price: 20,
        category: 'Fiction',
        img: 'test_image_url',
    },
    {
        asin: '456',
        title: 'Test Book 2',
        price: 25,
        category: 'Non-Fiction',
        img: 'test_image_url_2',
    },
]

const mockThemeContextValue = {
    isDarkMode: false,
}

const mockCommentSelectedCardContextValue = {
    selectedCardAsin: null,
    setSelectedCardAsin: jest.fn(),
    toggleIsSelect: jest.fn(),
}

describe('MainSection component', () => {
    it('should not render AllComments if no card is selected at startup', () => {
        render(
            <MemoryRouter>
                <BookContext.Provider value={{ books: mockBooks }}>
                    <DarkModeContext.Provider value={mockThemeContextValue}>
                        <SelectContext.Provider
                            value={mockCommentSelectedCardContextValue}
                        >
                            <MainSection />
                        </SelectContext.Provider>
                    </DarkModeContext.Provider>
                </BookContext.Provider>
            </MemoryRouter>
        )

        const allCommentsElement = screen.queryByText(/comments for/i)
        expect(allCommentsElement).not.toBeInTheDocument()
    })

    it('should render cards inside MainSection', () => {
        render(
            <MemoryRouter>
                <BookContext.Provider value={{ books: mockBooks }}>
                    <DarkModeContext.Provider value={mockThemeContextValue}>
                        <SelectContext.Provider
                            value={mockCommentSelectedCardContextValue}
                        >
                            <MainSection />
                        </SelectContext.Provider>
                    </DarkModeContext.Provider>
                </BookContext.Provider>
            </MemoryRouter>
        )

        mockBooks.forEach((book) => {
            const bookTitleElement = screen.getByText(book.title)
            expect(bookTitleElement).toBeInTheDocument()
        })
    })
})
