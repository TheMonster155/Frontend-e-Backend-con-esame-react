import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('Auth')
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}
