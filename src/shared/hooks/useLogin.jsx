import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from "../../services/authService.jsx";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
            throw new Error('Email and password are required');
        }

        setIsLoading(true);

        try {
            const response = await loginRequest({ email, password });
            setIsLoading(false);
            if (response.error) {
                setErrorMessage(response.error);
                throw new Error(response.error);
            }

            const token = response.data.token;

            if (!token) {
                throw new Error('Token is undefined');
            }

            localStorage.setItem('token', token);

            const decodedToken = decodeJWT(token);
            const userRole = decodedToken?.userRol || '';

            if (userRole === 'operador') {
                navigate('/orden', { state: { email, password } });
            } else {
                navigate('/home', { state: { email, password } });
            }
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Error interno del servidor');
            return { success: false, message: error.message };
        }
        return  { success: true };
    };

    return { login, isLoading, errorMessage };
};