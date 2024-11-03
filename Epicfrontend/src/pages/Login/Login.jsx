import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handlerInput = (event) => {
        const { name, value } = event.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
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
                localStorage.setItem('Auth', JSON.stringify(data.token))
                setTimeout(() => {
                    navigate('/homepage')
                }, 1000)
            } else {
                const errorData = await response.json()
                console.error('Login failed:', errorData)
                alert('Login fallito: ' + errorData.message)
            }
        } catch (error) {
            console.error('An error occurred:', error)
            alert('Si è verificato un errore durante il login.')
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={handlerInput}
                    value={formData.email}
                    name="email"
                    type="email"
                />
                <input
                    onChange={handlerInput}
                    value={formData.password}
                    name="password"
                    type="password"
                />
                <button type="submit">Invia</button>
            </form>
        </>
    )
}

/*
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
                navigate('/home')
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
