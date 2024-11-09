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

/*
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
*/

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SuccessLogin = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    console.log(token)

    useEffect(() => {
        if (token) {
            const decodedToken = JSON.parse(token)
            localStorage.setItem('auth', JSON.stringify(token))
            setTimeout(() => {
                navigate('/')
            }, 5000)
        }
    }, [token, navigate])
    return (
        <div className="container">
            <div className="row">
                <div className="col">ti sei loggato</div>
            </div>
        </div>
    )
}
export default SuccessLogin
