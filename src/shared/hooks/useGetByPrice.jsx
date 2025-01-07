import { useEffect, useState } from 'react';
import { getProductByPriceRange } from "../../services/productService.jsx";

const useGetByPrice = (minPrice, maxPrice) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProductByPriceRange(minPrice, maxPrice);
                console.log(response);
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [minPrice, maxPrice]);

    return { products, loading, error };
};

export default useGetByPrice;