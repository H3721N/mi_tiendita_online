import apiTienda from "./api.jsx";

export const confirmPurchase = async (data) => {
    try {
        const response = await apiTienda.post('/orden', data);
        console.log('Purchase request succeeded:', response.data);
        return response;
    } catch (e) {
        console.error('Purchase request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
}