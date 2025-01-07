import apiTienda from "./api.jsx";

export const addProduct = async (productData) => {
    try {
        console.log('product:', productData);
        const token = localStorage.getItem('token');
        console.log('token:', token);

        const response = await apiTienda.post('/producto', productData);

        return response.data;
    } catch (error) {
        console.error('error al agregar producto:', error);
    }
};

export const getProducts = async (page, size, minPrice, maxPrice) => {
    try {
        const response = await apiTienda.get('/producto', {
            params: {
                page,
                size,
                minPrice,
                maxPrice
            }
        });
        return response.data;
    } catch (error) {

        console.error("Error:", error);

    }
};

export const getCategories = async () => {
    try {
        const response = await apiTienda.get('/categoriaProducto');
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const updateProduct = async (productId, productData) => {
    try {
        const response = await apiTienda.put(`/producto/${productId}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getProductByPriceRange = async (minPrice, maxPrice) => {
    try {
        const response = await apiTienda.get('/producto/price-range', {
            params: {
                minPrice,
                maxPrice
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const getCatergoryWithPage = async (page, size) => {
    try {
        const response = await apiTienda.get('/categoriaProductoPage', {
            params: {
                page,
                size
            }
        });
        console.log('response:', response.data);
        return response.data;

    } catch (error) {
        console.error("Error:", error);
    }
}

export const postCategory = async (categoryData) => {
    try {
        const response = await apiTienda.post('/categoriaProducto', categoryData);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await apiTienda.put(`/categoriaProducto/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}