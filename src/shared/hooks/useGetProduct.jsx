import { useState, useEffect} from "react";
import { getProducts} from "../../services/productService.jsx";

export const useGetProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const data = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        console.log('token:', localStorage.getItem('token'));
        fetchProducts();
    }, []);

    return [products, loading, error];
}
