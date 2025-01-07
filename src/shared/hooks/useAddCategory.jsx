import { useState} from "react";
import { postCategory as AddCategory} from "../../services/productService.jsx";
import toast from "react-hot-toast";

export const useAddCategory = () => {
    const [isAdding, setIsAdding] = useState(false);

    const addCategory = async (idUsuario, nombre, idEstado, fechaCreacion) => {
        setIsAdding(true);

        const categoryData = {
            idUsuario, nombre, idEstado, fechaCreacion
        };

        try {
            const response = await AddCategory(categoryData);
            toast.success("Categoría agregada exitosamente");
            console.log('response:', response);
            return { categoryData, response };
        } catch (error) {
            toast.error("Error al agregar categoría");
            console.error('error:', error);
            return { categoryData, error };
        } finally {
            setIsAdding(false);
        }
    };

    return { addCategory, isAdding };
}