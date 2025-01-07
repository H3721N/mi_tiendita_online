import { useState } from "react";
import { addProduct as addProductRequest } from "../../services/productService";
import toast from "react-hot-toast";

export const useAddProduct = () => {
    const [isAdding, setIsAdding] = useState(false);

    const addProduct = async (idCategoria, idUsuario, nombre, marca, codigo, stock, idEstado, precios, fechaCreacion, foto) => {
        setIsAdding(true);

        const productData = {
            idCategoria, idUsuario, nombre, marca, codigo, stock, idEstado, precios, fechaCreacion, foto
        };

        try {
            const response = await addProductRequest(productData);
            toast.success("Producto agregado exitosamente");
            console.log('response:', response);
            return { productData, response };
        } catch (error) {
            toast.error("Error al agregar producto");
            console.error('error:', error);
            return { productData, error };
        } finally {
            setIsAdding(false);
        }
    };

    return { addProduct, isAdding };
};