import apiTienda from "./api.jsx";

export const getEstados = async () => {
    try {
        const response = await apiTienda.get('/estado');
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}