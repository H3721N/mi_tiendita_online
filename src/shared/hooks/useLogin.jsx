import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from "../../services/authService.jsx";
import toast from 'react-hot-toast';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const login = async (email, password) => {
        if (!email || !password) {
            toast.error('Email and password are required');
            return;
        }

        setIsLoading(true);

        const response = await loginRequest({
            email,
            password
        });


        setIsLoading(false);

        if (response.error) {
            toast.error('Error al iniciar sesión');
            return;
        }

        const token = response.data.token;

        if (!token) {
            toast.error('Token is undefined');
            return;
        }

        localStorage.setItem('token', token);

        const decodedToken = decodeJWT(token);

        const userRole = decodedToken.userRol;

        if (userRole === 'Admin') {
            navigate('/orden', { state: { email, password } });
        } else {
            navigate('/home', { state: { email, password } });
        }
    };

    return { login, isLoading };
};