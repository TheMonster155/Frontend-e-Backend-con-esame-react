/*import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { isAuth } from '../Middwlwers/ProtectRoutes'
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
*/

import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { isAuth } from '../Middwlwers/ProtectRoutes'
import { useNavigate } from 'react-router-dom'

export const useSession = () => {
    const session = isAuth()
    let decodedSession = null

    if (session && session.token) {
        try {
            decodedSession = jwtDecode(session.token, {
                header: true,
            })
        } catch (error) {
            console.error('Errore durante la decodifica del token:', error)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!session) {
            navigate('/')
        }
    }, [navigate, session])

    return decodedSession
}
