

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        
        const searchTokenParam = new URLSearchParams(location.search);
        const token = searchTokenParam.get("token");

        if (token) {
            // Salva il token in localStorage
            console.log("Token ricevuto:", token);  
            localStorage.setItem('Auth', token); 

            // va alla home page 
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }, [location, navigate]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    Ti sei loggato con successo. Verrai reindirizzato...
                </div>
            </div>
        </div>
    );
};

export default SuccessLogin;
