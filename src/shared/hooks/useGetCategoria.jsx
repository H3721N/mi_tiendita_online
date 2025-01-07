import { useState, useEffect } from "react";
import { getCategories } from "../../services/productService.jsx";

export const useGetProduct = (page, rowsPerPage, minPrice, maxPrice) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (response.data) {
                setCategories(response.data);
                console.log('categorias:', response);
            } else {
                setError(new Error('Failed to fetch categories'));
                console.log('error:', error);
                console.log('response:', response);
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [page, rowsPerPage, minPrice, maxPrice]);



    return { products, loading, error, total , categories, totalPages };
};