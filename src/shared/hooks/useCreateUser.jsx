import { useState } from 'react';
import { createUser as createUserRequest } from '../../services/userService';
import toast from 'react-hot-toast';

export const useCreateUser = () => {
    const [isAdding, setIsAdding] = useState(false);

    const createUser = async (idRol, idEstado, email, nombre, password, telefono, fechaNacimiento, razonSocial, nombreComercial, direccionEntrega) => {
        setIsAdding(true);

        console.log('ji')

        const userData = {
            idRol, idEstado, email, nombre, password, telefono, fechaNacimiento, razonSocial, nombreComercial, direccionEntrega
        };

        try {
            const response = await createUserRequest(userData);
            toast.success('Usuario creado exitosamente');
            console.log('response:', response);
            return { userData, response };
        } catch (error) {
            toast.error('Error al crear usuario');
            console.error('error:', error);
            return { userData, error };
        } finally {
            setIsAdding(false);
        }
    };

    return { isAdding, createUser };
};