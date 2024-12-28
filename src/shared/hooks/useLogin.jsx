import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from "../../services/api"
import toast from 'react-hot-toast';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);

        const response = await loginRequest ({
            email,
            password
        });

        setIsLoading(false);

        if (response.error) {
            toast.error('Error al iniciar sesión');
            return;
        }

        const { userDetails } = response.data;

        localStorage.setItem('userDetails', userDetails.email);

        navigate('/home', {state:{email}});

    }
    return { login, isLoading }
}