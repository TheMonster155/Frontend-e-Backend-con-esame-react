import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DarkModeContext } from '../context/DarkModeContext'
import Footer from './Footer'

const renderFooterWithContext = (value) => {
    return render(
        <DarkModeContext.Provider value={value}>
            <Footer />
        </DarkModeContext.Provider>
    )
}

describe('Footer Component', () => {
    it('should render the footer with the correct title and social icons', () => {
        const contextValue = { isDark: false, handleDarkMode: jest.fn() }
        renderFooterWithContext(contextValue)

        expect(screen.getByText(/book store/i)).toBeInTheDocument()

        expect(screen.getByTitle('A')).toBeInTheDocument() // Twitter
        expect(screen.getByTitle('B')).toBeInTheDocument() // Tiktok
        expect(screen.getByTitle('C')).toBeInTheDocument() // Instagram
    })

    it('should toggle dark mode', () => {
        const handleDarkMode = jest.fn()
        const contextValue = { isDark: false, handleDarkMode }

        const { rerender } = renderFooterWithContext(contextValue)

        expect(
            screen.getByRole('button', { name: /light mode/i })
        ).toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: /light mode/i }))

        expect(handleDarkMode).toHaveBeenCalledTimes(1)

        rerender(
            <DarkModeContext.Provider value={{ isDark: true, handleDarkMode }}>
                <Footer />
            </DarkModeContext.Provider>
        )

        expect(
            screen.getByRole('button', { name: /dark mode/i })
        ).toBeInTheDocument()
    })

    it('should apply the correct styles based on dark mode', () => {
        const contextValueDark = { isDark: true, handleDarkMode: jest.fn() }
        const { container: containerDark } =
            renderFooterWithContext(contextValueDark)

        expect(containerDark.firstChild).toHaveClass('bg-dark', 'text-light')

        const contextValueLight = { isDark: false, handleDarkMode: jest.fn() }
        const { container: containerLight } =
            renderFooterWithContext(contextValueLight)

        expect(containerLight.firstChild).toHaveClass('bg-light', 'text-dark')
    })
})
