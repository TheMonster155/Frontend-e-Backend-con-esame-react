import React, { useState } from 'react'

const ContactPage = () => {
    const [userEmail, setUserEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailData = {
            email: userEmail,
            message,
        }

        try {
            const response = await fetch('http://localhost:3061/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            })

            if (!response.ok) {
                throw new Error('Errore nella risposta del server')
            }

            const data = await response.json()
            setStatus('Messaggio inviato con successo!')
            setUserEmail('')
            setMessage('')
        } catch (error) {
            console.error("Errore nell'invio del messaggio:", error)
            setStatus("Errore nell'invio del messaggio.")
        }
    }

    return (
        <div>
            <h2>Contattaci</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Messaggio:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Invia</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    )
}

export default ContactPage
