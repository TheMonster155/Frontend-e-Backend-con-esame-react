import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        dob: '',
        email: '',
        password: '',
        username: '',
        gender: '',
        address: '',
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/users/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            if (response.ok) {
                navigate('/') // Reindirizza alla pagina home se l'utente è stato creato
            } else {
                const errorData = await response.json()
                setError(
                    errorData.errors
                        ? errorData.errors.join(', ')
                        : "Si è verificato un errore durante l'iscrizione."
                )
            }
        } catch (error) {
            setError("Si è verificato un errore durante l'iscrizione.")
        }
    }

    return (
        <div className="signup-container">
            <h2>Registrazione Nuovo Utente</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Cognome:</label>
                <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                />

                <label>Data di Nascita:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label>Genere:</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="not specified">Non specificato</option>
                    <option value="M">Maschio</option>
                    <option value="F">Femmina</option>
                    <option value="L">Lesbica</option>
                    <option value="G">Gay</option>
                    <option value="T">Transgender</option>
                </select>

                <label>Indirizzo:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <button type="submit">Registrati</button>
            </form>
        </div>
    )
}

export default About
