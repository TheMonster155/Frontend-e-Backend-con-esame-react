import jwtDecode from 'jwt-decode'

import { Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login'

export const isAuth = () => {
    return JSON.parse(localStorage.getItem('Auth'))
}

const ProtectedRoutes = () => {
    const session = isAuth()

    return session ? <Outlet /> : <Login />
}
export default ProtectedRoutes
