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
export const getOrderDetail = async (token, id) => {
    try {
        const response = await apiTienda.get(`/orden/${id}`, {
            headers: {
                'Authorization': token,
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}