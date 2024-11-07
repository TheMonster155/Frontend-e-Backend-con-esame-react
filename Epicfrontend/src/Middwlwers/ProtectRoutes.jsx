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
import { Outlet, Navigate } from 'react-router-dom'

export const isAuth = () => {
    const storedSession = localStorage.getItem('auth') // Verifica il nome corretto della chiave
    if (storedSession) {
        try {
            const token = JSON.parse(storedSession) // Estrai il token
            const decodedToken = jwtDecode(token) // Decodifica il token

            // Verifica se il token è scaduto
            if (decodedToken.exp * 1000 < Date.now()) {
                console.log('Token scaduto')
                return null // Il token è scaduto, quindi l'utente non è autenticato
            }

            console.log('Token valido:', decodedToken)
            return decodedToken // Ritorna il token decodificato
        } catch (error) {
            console.error('Errore nel parsing del token:', error)
            return null
        }
    }
    return null
}

const ProtectedRoutes = () => {
    const session = isAuth()

    console.log('Is user authenticated:', session) // Log del controllo di autenticazione

    // Se l'utente è autenticato, permetti il rendering dell'outlet, altrimenti reindirizza al login
    return session ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
