/*
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({}) => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handlerInput = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            // Controlla se la risposta è ok
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('Auth', JSON.stringify(data))
                navigate('/')
            } else {
                const errorData = await response.json() // Recupera il messaggio di errore dal server
                console.log(`Error: ${errorData.message}`) // Stampa l'errore
                // Puoi anche mostrare un messaggio di errore all'utente se necessario
            }
        } catch (error) {
            console.log(error) // Stampa l'errore nel caso ci sia un problema nella richiesta
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={handlerInput}
                    name="email"
                    type="email"
                    required
                />
                <input
                    onChange={handlerInput}
                    name="password"
                    type="password"
                    required
                />
                <button type="submit">Invia</button>
            </form>
        </>
    )
}

export default Login
*/
/*
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
    // Ricevi onLogin come props
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handlerInput = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            // Controlla se la risposta è ok
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('Auth', JSON.stringify(data))
                onLogin(data.userName) // Passa il nome dell'utente a onLogin
                navigate('/') // Reindirizza alla homepage
            } else {
                const errorData = await response.json()
                console.log(`Error: ${errorData.message}`)
                // Puoi anche mostrare un messaggio di errore all'utente se necessario
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={handlerInput} name="email" type="email" required />
            <input
                onChange={handlerInput}
                name="password"
                type="password"
                required
            />
            <button type="submit">Invia</button>
        </form>
    )
}

export default Login
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const { login } = useUserContext() // Usa il contesto per il login

    const handlerInput = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('Auth', JSON.stringify(data))
                login(data.user) // Passa i dati dell'utente al contesto
                onLogin(data.user) // Passa l'oggetto utente alla navbar
                navigate('/') // Naviga alla homepage
            } else {
                const errorData = await response.json()
                console.log(`Error: ${errorData.message}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={handlerInput} name="email" type="email" required />
            <input
                onChange={handlerInput}
                name="password"
                type="password"
                required
            />
            <button type="submit">Invia</button>
        </form>
    )
}

export default Login
