
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { isAuth } from '../Middwlwers/ProtectRoutes'
import { useNavigate } from 'react-router-dom';

export const useSession = () => {
    const session = isAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate('/');
        }
    }, [navigate, session]);

    return session;
};
