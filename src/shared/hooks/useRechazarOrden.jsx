import { useState } from 'react';
import { cancelarOrden } from '../../services/ordenService';

export const useRechazarOrden = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const rechazarOrden = async (id) => {
        setIsLoading(true);
        try {
            await cancelarOrden(id);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return { rechazarOrden, isLoading, error };
};