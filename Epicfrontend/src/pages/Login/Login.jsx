/*import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'
import { Container, Form, Button } from 'react-bootstrap'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [showLogin, setShowLogin] = useState(true)
    const handleClose = () => {
        setShowLogin(false)
    }
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useUserContext()

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
                login(data.user)

                handleClose()

                const redirectTo = location.state?.from || '/'
                navigate(redirectTo)
            } else {
                const errorData = await response.json()
                console.log(`Error: ${errorData.message}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!showLogin) {
        return null
    }

    const redirectToGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Accedi al tuo account</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Inserisci la tua email"
                            onChange={handlerInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Inserisci la tua password"
                            onChange={handlerInput}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                    <Button onClick={redirectToGoogle}>
                        Login with googgle
                    </Button>

                    <div className="text-center mt-3">
                        <p>
                            Non hai un account?{' '}
                            <a
                                href="/about"
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                            >
                                Registrati qui
                            </a>
                        </p>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Login
*/

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'
import { Container, Form, Button } from 'react-bootstrap'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [showLogin, setShowLogin] = useState(true)
    const handleClose = () => {
        setShowLogin(false)
    }
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useUserContext()

    const handlerInput = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const loginSuccess = (token, user) => {
        const sessionData = {
            token: token,
            userId: user._id,
            email: user.email,
        }
        localStorage.setItem('Auth', JSON.stringify(sessionData))
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

                // Usa la funzione loginSuccess per memorizzare il token e i dati utente
                loginSuccess(data.token, data.user)

                login(data.user)
                handleClose()

                const redirectTo = location.state?.from || '/'
                navigate(redirectTo)
            } else {
                const errorData = await response.json()
                console.log(`Error: ${errorData.message}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!showLogin) {
        return null
    }

    const redirectToGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Accedi al tuo account</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Inserisci la tua email"
                            onChange={handlerInput}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Inserisci la tua password"
                            onChange={handlerInput}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                    <Button onClick={redirectToGoogle}>
                        Login with Google
                    </Button>

                    <div className="text-center mt-3">
                        <p>
                            Non hai un account?{' '}
                            <a
                                href="/about"
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                            >
                                Registrati qui
                            </a>
                        </p>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Login
