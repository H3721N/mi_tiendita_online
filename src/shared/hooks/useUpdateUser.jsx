import { useState } from 'react';
import { updateUser } from '../../services/userService';

export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const handleUpdateUser = async (userData) => {
        setLoading(true);
        setError(null);

        console.log('userData:', userData.idEstado);

        try {
            const response = await updateUser(userData.id, {
                ...userData,
                idEstado: userData.idEstado
            });
            if (response) {
                setUser(response);
            } else {
                setError(new Error('Failed to update user'));
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { user, loading, error, handleUpdateUser };
}