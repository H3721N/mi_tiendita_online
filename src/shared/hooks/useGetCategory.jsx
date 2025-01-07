import { useState, useEffect } from "react";
import { getCatergoryWithPage } from "../../services/productService.jsx";

export const useGetCategory = (page, rowsPerPage) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const fetchCategory = async () => {
        try {
            const response = await getCatergoryWithPage(page + 1, rowsPerPage);
            console.log('Response:', response);
            if (response.success) {
                console.log('Before setting category:', category);
                setCategory(response.data);
                setTotal(response.pagination.totalItems);
                console.log('After setting category:', response.data);
                console.log('total:', response.pagination.totalItems);
            } else {
                setError(new Error('Failed to fetch category'));
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [page, rowsPerPage]);

    console.log('category:', category);

    return { category, loading, error, total };
}