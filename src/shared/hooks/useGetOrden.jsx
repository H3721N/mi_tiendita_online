import { useState, useEffect } from 'react';
import { getOrders } from '../../services/ordenService';

export const useGetOrden = (page, rowsPerPage) => {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrdenes = async (page, rowsPage) => {
        try {
            const ferchOrdenes = await getOrders(page+1, rowsPage);
            setOrdenes(ferchOrdenes.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdenes(page, rowsPerPage);
    }, [page, rowsPerPage]);

    return [ordenes, loading, error];
};