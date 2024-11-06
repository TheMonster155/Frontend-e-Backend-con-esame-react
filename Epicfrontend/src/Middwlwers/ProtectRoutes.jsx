import jwtDecode from 'jwt-decode'

import { Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login'

export const isAuth = () => {
    return JSON.parse(localStorage.getItem('Auth'))
}

//usare il

const ProtectedRoutes = () => {
    const session = isAuth()
    // fare un if per le cose piecifiche

    return session ? <Outlet /> : <Login />
}
export default ProtectedRoutes
