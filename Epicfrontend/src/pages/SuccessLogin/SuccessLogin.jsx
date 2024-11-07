import { useEffect } from 'react'
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
