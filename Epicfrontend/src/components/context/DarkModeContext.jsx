import { createContext, useEffect, useState } from 'react'

export const DarkModeContext = createContext()

export const DarkModeContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false)

    const handleDarkMode = () => {
        setIsDark((dark) => !dark)
    }
    useEffect(() => {
        document.body.className = isDark ? 'dark-mode' : 'light-mode'
    }, [isDark])

    return (
        <DarkModeContext.Provider value={{ isDark, handleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}
