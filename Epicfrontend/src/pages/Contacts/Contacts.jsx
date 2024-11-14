import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Contact.css'
import { Col, Container, Row } from 'react-bootstrap'
import NavbarCustom from '../../components/Navbar/Navbar'
import Swal from 'sweetalert2'

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
            setUserEmail('')
            setMessage('')

        +
            await Swal.fire({
                icon: 'success',
                title: 'Messaggio inviato!',
                text: 'Il tuo messaggio è stato inviato con successo.',
            })

          
            
            window.location.href = '/'
        } catch (error) {
            console.error("Errore nell'invio del messaggio:", error)
            setStatus("Errore nell'invio del messaggio.")
            await Swal.fire({
                icon: 'error',
                title: 'Errore!',
                text: "Si è verificato un errore nell'invio del messaggio.",
            })
        }
    }

    return (
        <>
            <NavbarCustom />
            <Container className="contact-container mt-4 p-4 rounded shadow">
                <Row className="justify-content-center mt-4">
                    <Col xs={12} md={8} lg={6} className="text-center">
                        <h2 className="mb-4">Contattaci</h2>
                        <p className="mb-4">
                            Se hai domande, non esitare a contattarci!
                            Risponderemo il più velocemente possibile.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={userEmail}
                                    onChange={(e) =>
                                        setUserEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Messaggio:</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Invia
                            </button>
                        </form>
                        {status && (
                            <p className="text-success mt-3">{status}</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ContactPage
