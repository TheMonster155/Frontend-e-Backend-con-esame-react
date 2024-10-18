import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BookContextProvider } from './components/context/BookContext'
import { DarkModeContextProvider } from './components/context/DarkModeContext.jsx'
import { SelectContextProvider } from './components/context/SelectContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SelectContextProvider>
            <DarkModeContextProvider>
                <BookContextProvider>
                    <App />
                </BookContextProvider>
            </DarkModeContextProvider>
        </SelectContextProvider>
    </StrictMode>
)
