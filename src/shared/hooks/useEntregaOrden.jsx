import { useState } from 'react';
import { entregarOrden } from '../../services/ordenService';

export const useEntregaOrden = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const entregar = async (id) => {
        setIsLoading(true);
        try {
            await entregarOrden(id);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    return { entregar, isLoading, error };
};