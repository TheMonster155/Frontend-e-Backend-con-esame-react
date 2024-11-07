/*import jwtDecode from 'jwt-decode'

import { Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login'
/*
export const isAuth = () => {
    console.log(localStorage)
    return JSON.parse(localStorage.getItem('Auth'))
}
*/
/*
// utils/ProtectRoutes.js
export const isAuth = () => {
    const storedSession = localStorage.getItem('Auth')
    if (storedSession) {
        try {
            return JSON.parse(storedSession) // Assicurati che il sessione sia un oggetto valido
        } catch (error) {
            console.error('Errore nel parsing della sessione:', error)
            return null
        }
    }
    return null
}

//usare il

const ProtectedRoutes = () => {
    const session = isAuth()
    // fare un if per le cose piecifiche

    return session ? <Outlet /> : <Login />
}
export default ProtectedRoutes
*/

import jwtDecode from 'jwt-decode'
import { Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login'

export const isAuth = () => {
    const storedSession = localStorage.getItem('Auth')
    if (storedSession) {
        try {
            const session = JSON.parse(storedSession) // Log del session storage
            console.log('Stored Session:', session)
            return session
        } catch (error) {
            console.error('Errore nel parsing della sessione:', error)
            return null
        }
    }
    return null
}

const ProtectedRoutes = () => {
    const session = isAuth()

    console.log('Is user authenticated:', session) // Log del controllo di autenticazione

    return session ? <Outlet /> : <Login />
}

export default ProtectedRoutes
