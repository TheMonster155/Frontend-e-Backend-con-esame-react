/*import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SuccessLogin = () => {
    const [user, setUser] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const userParam = queryParams.get('user')
        if (userParam) {
            setUser(JSON.parse(decodeURIComponent(userParam)))
        }
    }, [location])

    useEffect(() => {
        if (user) {
            navigate('/homepage')
        }
    }, [user, navigate])

    if (!user) {
        return <div>Caricamento...</div>
    }

    return (
        <div>
            <h1>Benvenuto, {user.name}</h1>
        </div>
    )
}

export default SuccessLogin
*/

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const SuccessLogin = () => {
    const [user, setUser] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const token = queryParams.get('token')

        if (token) {
            // Decodifica il token per ottenere i dati dell'utente
            const decodedUser = jwt_decode(token)
            setUser(decodedUser)
            localStorage.setItem('token', token) // Salva il token in localStorage
        }
    }, [location])

    useEffect(() => {
        if (user) {
            navigate('/homepage')
        }
    }, [user, navigate])

    if (!user) {
        return <div>Caricamento...</div>
    }

    return (
        <div>
            <h1>Benvenuto, {user.name}</h1>
        </div>
    )
}

export default SuccessLogin
