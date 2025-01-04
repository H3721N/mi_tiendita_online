import { useState, useEffect } from 'react';
import { getOrderDetail } from '../../services/ordenService.jsx';
import toast from 'react-hot-toast';

export const useOrdenById = ( page = 1, pageSize = 10) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const id = 23;

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token is missing');
                }

                const data = await getOrderDetail(token, id, page, pageSize);
                setOrderDetail(data);
            } catch (err) {
                setError(err.message);
                toast.error('Error fetching order details');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchOrderDetail();
        }

    }, [id, page, pageSize]);

    return { orderDetail, isLoading, error };
};