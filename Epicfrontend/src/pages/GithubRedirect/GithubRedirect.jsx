import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const GithubRedirect = () => {
    //const { token } = useParams()
    const navigate = useNavigate()
    const search = window.location.search
    const params = new URLSearchParams(search)
    const token = params.get('token')
    console.log(token)
    console.log(useParams)

    useEffect(() => {
        if (token) {
            localStorage.setItem('auth', JSON.stringify(token))
            console.log(localStorage)

            fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login/github`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    userId: 4,
                    username: 'abc',
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Dati utente salvati:', data)
                })
                .catch((error) => {
                    console.error('Errore nel salvataggio dei dati:', error)
                })

            setTimeout(() => {
                navigate('/')
            }, 5000)
        }
    }, [token])

    return (
        <div className="container">
            <div className="row">
                <div className="col">ti sei loggato</div>
            </div>
        </div>
    )
}
export default GithubRedirect

/*

*/
