import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Login } from '../pages/Login/Login'

const isAuth = () => {
    try {
        const token = localStorage.getItem('Auth') // Recupero del token dal localStorage
        if (!token) return false // Se non esiste, restituisce false

        return true // Restituisce true se il token è valido
    } catch (error) {
        console.error('Errore nella verifica del token:', error)
        localStorage.removeItem('Auth') // Rimuove il token in caso di errore
        return false
    }
}

export const useSession = () => {
    const session = isAuth()
    const token = localStorage.getItem('Auth') // Recupera il token
    const decodedSession = session && token ? jwtDecode(token) : null // Decodifica il token
    const navigate = useNavigate()
    useEffect(() => {
        if (!session) {
            navigate('/login') // Reindirizza se non autenticato
        }
    }, [navigate, session])
    return decodedSession
}

export const ProtectedRoutes = () => {
    const isAuthorized = isAuth()
    console.log('Is Authorized:', isAuthorized)
    const session = useSession()
    return isAuthorized ? <Outlet /> : <Login />
}
