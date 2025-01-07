import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser as registerRequest } from "../../services/authService.jsx";
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isRegister, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (nombre, telefono, email, fechaNacimiento,
                                nombreComercial, razonSocial, direccionEntrega,
                                password, confirmPassword) => {
        setIsLoading(true);

        const response = await registerRequest({
            nombre, telefono, email, fechaNacimiento,
            nombreComercial, razonSocial, direccionEntrega,
            password, confirmPassword
        });

        setIsLoading(false);

        if (response.error) {
            toast.error("Error al registrar usuario");
            return;
        }

        navigate("/", { state: { email, password } });
    };

    return { registerUser, isRegister };
}