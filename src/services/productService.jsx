import apiTienda from "./api.jsx";

export const getProducts = async (token) => {
    try {
        const response = await apiTienda.get('/producto', {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 409:
                    console.error("Conflict error: ", error.response.data);
                    break;
                case 401:
                    console.error("Unauthorized: Token is invalid or expired.", error.response.data);
                    break;
                default:
                    console.error("Error response:", error.response.data);
            }
        } else {
            console.error("Error:", error);
        }
    }
};