/*import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SuccessLogin = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get('token')

        if (token) {
            localStorage.setItem('auth', JSON.stringify(token))
            setTimeout(() => {
                navigate('/homepage')
            }, 1000)
        }
    }, [location, navigate])

    return (
        <div>
            <h1>Login Effettuato con successo</h1>
        </div>
    )
}

export default SuccessLogin
*/
/*
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SuccessLogin = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const token = searchParams.get('token')

        console.log('Token ricevuto:', token)
        if (token) {
            try {
                // Salva il token nel localStorage
                localStorage.setItem('auth', JSON.stringify(token))

                // Imposta un timeout prima del reindirizzamento
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } catch (error) {
                console.error('Errore nel salvataggio del token:', error)
            }
        } else {
            console.error("Token non presente nell'URL")
            navigate('/login') // Reindirizza all'area di login in caso di errore
        }
    }, [location, navigate])

    return (
        <div>
            <h1>Login Effettuato con successo</h1>
        </div>
    )
}

export default SuccessLogin
*/
import { useEffect, useState } from 'react'
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
            // Quando l'utente è stato caricato, fai il redirect alla homepage
            navigate('/homepage')
        }
    }, [user, navigate])

    if (!user) {
        return <div>Caricamento...</div>
    }

    return (
        <div>
            <h1>Benvenuto, {user.name}</h1>
            {/* Altri dettagli dell'utente */}
        </div>
    )
}

export default SuccessLogin
