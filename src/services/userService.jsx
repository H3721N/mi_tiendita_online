import apiTienda from "./api.jsx";

export const getUserById = async (id) => {
    try {
        const response = await apiTienda.get(`/usuario/${id}`);
        return response.data;
    } catch (e) {
        console.error('Get user request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
};