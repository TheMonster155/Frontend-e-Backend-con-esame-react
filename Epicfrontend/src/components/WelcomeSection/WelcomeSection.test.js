import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import WelcomeSection from './WelcomeSection'
import { DarkModeContextProvider } from '../context/DarkModeContext'
import { MemoryRouter } from 'react-router-dom'

const mockSweetAlert = jest.fn()

describe('Test WelcomeSection ', () => {
    it(' should renders Welcome component', () => {
        render(
            <MemoryRouter>
                <DarkModeContextProvider>
                    <WelcomeSection sweetAlert={mockSweetAlert} />
                </DarkModeContextProvider>
            </MemoryRouter>
        )

        const titleElement = screen.getByText(/libro del giorno/i)
        expect(titleElement).toBeInTheDocument()
    })

    test('renders book details and buttons', () => {
        render(
            <MemoryRouter>
                <DarkModeContextProvider>
                    <WelcomeSection sweetAlert={mockSweetAlert} />
                </DarkModeContextProvider>
            </MemoryRouter>
        )

        const purchaseButton = screen.getByText(/acquista/i)
        expect(purchaseButton).toBeInTheDocument()

        const detailsButton = screen.getByText(/dettagli/i)
        expect(detailsButton).toBeInTheDocument()
    })
})

//
