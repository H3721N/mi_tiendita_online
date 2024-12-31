import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from "../../services/authService.jsx";
import toast from 'react-hot-toast';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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

        console.log(response);

        setIsLoading(false);

        if (response.error) {
            toast.error('Error al iniciar sesión');
            return;
        }

        const { userDetails } = response.data;

        if (response.data && response.data.userDetails) {
            const { userDetails } = response.data;
            localStorage.setItem('userDetails', userDetails.email);
            console.log(email);
        } else {
            toast.error('Invalid response from server');
        }

        console.log(email);

        navigate('/home', { state: { email, password } });
    };

    return { login, isLoading };
};