
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const SuccessLogin = () => {
    const location = useLocation()
    const navigate = useNavigate()

    

    useEffect(() => {
        const searchTokenParan = new URLSearchParams(location.search)
        const token = searchTokenParan.get("token")
        if (token) {
            
            localStorage.setItem('Auth', JSON.stringify(token))
            setTimeout(() => {
                navigate('/')
            }, 5000)
        }
    }, [location, navigate])
    return (
        <div className="container">
            <div className="row">
                <div className="col">ti sei loggato</div>
            </div>
        </div>
    )
}
export default SuccessLogin
