import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'
import { Container, Form, Button } from 'react-bootstrap'
//TODO: AGGIUGERE UNA ICONA A GIT E GOOGLE
const Login = ({ onLogin, handleCloseLogin }) => {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
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
                if (handleCloseLogin) {
                    handleCloseLogin()
                }

                const redirectTo = location.state?.from || '/'
                navigate(redirectTo)
            } else {
                const errorData = await response.json()
                setErrorMessage('Password o email errata. Riprova.')
                console.log(`Error: ${errorData.message}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    /*
    if (!showLogin) {
        return null
    }
*/
    const redirectToGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }
    const redirectToGithub = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/github/`
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Accedi al tuo account</h2>
                {errorMessage && (
                    <p variant="danger" className="text-center">
                        {errorMessage}
                    </p>
                )}
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
                    <Button className="btn btn-dark" onClick={redirectToGithub}>
                        <svg
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            id="github"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                fill="#24292f"
                            />
                        </svg>

                        <span>Login with GitHUb</span>
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
