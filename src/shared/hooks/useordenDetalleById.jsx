import { useState, useEffect } from 'react';
import { getOrderDetail } from '../../services/ordenService.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useOrdenById = (id, page = 1, pageSize = 10) => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 10, totalOrdenDetalles: 0, totalPage: 0 });
    const navigate = useNavigate();


    useEffect(() => {
        const fetchOrderDetail = async () => {
            setIsLoading(true);
            setError(null);



            try {
                const response = await getOrderDetail(id, page, pageSize);
                setOrderDetail(response.orden);
                setOrders(response);
                setPagination(response.pagination);
                if (response.orden === null) {
                    toast.error('No se puede acceder');
                }
               console.log('Data:', response.data);
                console.log('Orders Detail:', response.orden);
                console.log('Pagination:', pagination);
                navigate(`/orderDetail/${id}`, { state: { orderDetail: response.orden, orders: response.data, pagination: response.pagination } });
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

    }, [id, page, pageSize, navigate]);

    return { orderDetail, isLoading, error };
};