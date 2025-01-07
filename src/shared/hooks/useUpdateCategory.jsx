import { useState} from "react";
import { updateCategory } from "../../services/productService.jsx";

export const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);

    const handleUpdateCategory = async (categoryData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await updateCategory(categoryData.id, {
                ...categoryData
            });
            if (response) {
                setCategory(response);
            } else {
                setError(new Error('Failed to update category'));
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { category, loading, error, handleUpdateCategory };
}

