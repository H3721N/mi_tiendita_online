import apiTienda from "./api.jsx";

export const getOrders = async (page, rowsPerPage) => {
    try {
        const response = await apiTienda.get('/orden', {
            params: {
                page,
                rowsPerPage
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
export const getOrderDetail = async ( id) => {
    try {
        const response = await apiTienda.get(`/orden/${id}`)
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const cancelarOrden = async (id) => {
    try {
        const response = await apiTienda.put(`/orden/cancelar/${id}`)
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export const entregarOrden = async (id) => {
    try {
        const response = await apiTienda.put(`/orden/entregar/${id}`)
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}