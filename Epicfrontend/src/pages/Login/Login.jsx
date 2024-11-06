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
/*
quello buono

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
*/

/*
// Login.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
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
                onLogin(data.user)
                navigate('/')
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
*/

/*

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({})
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
                onLogin(data.user)

                // Reindirizzamento condizionale
                const redirectTo = location.state?.from?.pathname || '/'
                navigate(redirectTo)
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
            <input
                onChange={handlerInput}
                name="email"
                type="email"
                required
                placeholder="Email"
            />
            <input
                onChange={handlerInput}
                name="password"
                type="password"
                required
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>
                Non hai un account?{' '}
                <a
                    href="/about"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    Registrati qui
                </a>
            </p>
        </form>
    )
}

export default Login
*/

/*

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'

const Login = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useUserContext() // Usa login direttamente dal contesto

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
                login(data.user) // Chiama login direttamente

                // Reindirizzamento condizionale
                const redirectTo = location.state?.from?.pathname || '/'
                navigate(redirectTo)
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
            <input
                onChange={handlerInput}
                name="email"
                type="email"
                required
                placeholder="Email"
            />
            <input
                onChange={handlerInput}
                name="password"
                type="password"
                required
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>
                Non hai un account?{' '}
                <a
                    href="/about"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    Registrati qui
                </a>
            </p>
        </form>
    )
}

export default Login
*/
/*
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'

const Login = () => {
    const [formData, setFormData] = useState({})
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

                // Determina la destinazione del reindirizzamento
                const redirectTo = location.state?.from || '/' // Usa "from" se disponibile, altrimenti "/"
                navigate(redirectTo)
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
            <input
                onChange={handlerInput}
                name="email"
                type="email"
                required
                placeholder="Email"
            />
            <input
                onChange={handlerInput}
                name="password"
                type="password"
                required
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>
                Non hai un account?{' '}
                <a
                    href="/about"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    Registrati qui
                </a>
            </p>
        </form>
    )
}

export default Login
*/
/*
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../components/context/UserContext'
import { Container, Form, Button } from 'react-bootstrap'

const Login = () => {
    const [formData, setFormData] = useState({})
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

                // Determina la destinazione del reindirizzamento
                const redirectTo = location.state?.from || '/' // Usa "from" se disponibile, altrimenti "/"
                navigate(redirectTo)
            } else {
                const errorData = await response.json()
                console.log(`Error: ${errorData.message}`)
            }
        } catch (error) {
            console.log(error)
        }
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
    const [showLogin, setShowLogin] = useState(true) // Stato per gestire la visibilità del form
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

                // Nascondi il modulo dopo il login
                setShowLogin(false)

                // Determina la destinazione del reindirizzamento
                const redirectTo = location.state?.from || '/' // Usa "from" se disponibile, altrimenti "/"
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
        return null // Rende invisibile il form di login una volta che l'utente è loggato
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
