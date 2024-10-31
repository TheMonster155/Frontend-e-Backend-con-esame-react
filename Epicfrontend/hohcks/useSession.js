import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { isAuth } from '../../Epicfrontend/src/Middwlwers/ProtectRoutes'
import { useNavigate } from 'react-router-dom'

export const useSession = () => {
    const session = isAuth()
    const decodedSession = session
        ? jwtDecode(session.token, {
              header: true,
          })
        : null
    const navigate = useNavigate()
    useEffect(() => {
        if (!session) {
            navigate('/')
        }
    }, [navigate, session])
    return decodedSession
}
