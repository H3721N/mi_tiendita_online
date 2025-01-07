import apiTienda from "./api.jsx";


export const login = async (data) => {
    try {
        const response = await apiTienda.post('/login', data);
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (e) {
        console.error('Login request failed:', e.response ? e.response.data : e.message);
        return {
            error: e.response.data.error,
            e
        };
    }
};

export const registerUser = async (data) => {
    try {
        const response = await apiTienda.post('/clienteUsuario', data);
        return response;
    } catch (e) {
        console.error('Register request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
};
