import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onlogin }) => {
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
                onlogin(data) // Chiama la funzione onlogin passando i dati ricevuti
                navigate('/') // Naviga alla home page
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
