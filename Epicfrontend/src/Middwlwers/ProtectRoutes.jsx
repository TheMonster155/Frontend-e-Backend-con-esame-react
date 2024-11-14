

import jwtDecode from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login/Login';

export const isAuth = () => {
    const storedToken = localStorage.getItem('Auth');
    if (storedToken) {
        try {
            const decodedToken = jwtDecode(storedToken); 
            console.log('Token decodificato:', decodedToken);
          
            return decodedToken;
        } catch (error) {
            console.error('Errore nel decoding del token:', error);
            return null;
        }
    }
    return null;
};

const ProtectedRoutes = () => {
    const session = isAuth();


    return session ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
