import { useState, useEffect } from "react";
import { getProducts } from "../../services/productService.jsx";
import { getCategories } from "../../services/productService.jsx";

export const useGetProduct = (page, rowsPerPage, minPrice, maxPrice) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getProducts(page + 1 , rowsPerPage, minPrice, maxPrice);
            console.log('Response:', response);
            if (response.success) {
                setProducts(response.data);
                setTotal(response.pagination.totalItems);
                setTotalPages(response.pagination.totalPages);
                console.log('total:', response);
            } else {
                setError(new Error('Failed to fetch products'));
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

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
        fetchProducts();
        fetchCategories();
    }, [page, rowsPerPage, minPrice, maxPrice]);



    return { products, loading, error, total , categories, totalPages };
};