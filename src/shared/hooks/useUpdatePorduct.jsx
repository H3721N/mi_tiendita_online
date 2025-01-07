import { useState, useEffect} from "react";
import { updateProduct} from "../../services/productService.jsx";

export const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);

    const handleUpdateProduct = async (productData) => {
        setLoading(true);
        setError(null);

        console.log('productData:', productData);

        try {
            const response = await updateProduct(productData.id, productData);
            if (response) {
                setProduct(response);
            } else {
                setError(new Error('Failed to update product'));
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { product, loading, error, handleUpdateProduct };
}