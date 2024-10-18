
import { render, screen } from '@testing-library/react'
import AllComments from './AllComments'
import { DarkModeContext } from '../context/DarkModeContext'
import { json } from 'react-router-dom'

describe('renders AllComments', () => {
    it(' should renders CommentArea component correctly', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        {
                            _id: '1',
                            author: 'John',
                            comment: 'Great book!',
                            rate: 5,
                        },
                        {
                            _id: '2',
                            author: 'Jane',
                            comment: 'Not bad',
                            rate: 3,
                        },
                    ]),
            })
        )

        render(
            <DarkModeContext.Provider value={{ isDark: false }}>
                <AllComments asin="123" />
            </DarkModeContext.Provider>
        )

        expect(await screen.findByText(/Great book!/i)).toBeInTheDocument()
        expect(await screen.findByText(/Not bad/i)).toBeInTheDocument()

        expect(screen.getByPlaceholderText(/Rate/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Comment/i)).toBeInTheDocument()
    })

    it('renders fallback message when there are no comments', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        )

        render(
            <DarkModeContext.Provider value={{ isDark: false }}>
                <AllComments asin="123" />
            </DarkModeContext.Provider>
        )

        expect(
            await screen.findByText(/Non ci sono commenti per questo libro/i)
        ).toBeInTheDocument()
    })
})

