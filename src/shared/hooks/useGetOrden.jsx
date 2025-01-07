import { useState, useEffect } from 'react';
import { getOrders } from '../../services/ordenService';

export const useGetOrden = (page, rowsPerPage) => {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [totalOrden, setTotalOrden] = useState(0);

    const fetchOrdenes = async (page, rowsPage) => {
        try {
            const response = await getOrders(page + 1, rowsPage);
            setOrdenes(response.data);
            setTotalPage(response.pagintation.totalOrden);
            setTotalOrden(response.pagintation.totalOrden);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdenes(page, rowsPerPage);
    }, [page, rowsPerPage]);

    return [ordenes, loading, error, totalPage, totalOrden];
};