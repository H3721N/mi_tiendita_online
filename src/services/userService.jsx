import apiTienda from "./api.jsx";

export const getUserById = async (id) => {
    try {
        const response = await apiTienda.get(`/usuario/${id}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getUsers = async (page, size) => {
    try {
        const response = await apiTienda.get('/usuario', {
            params: {
                page,
                size
            }
        });
        console.log('Get users response:', response.data);
        return response.data;
    } catch (e) {
        console.error('Get users request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
}

export const createUser = async (data) => {
    try {
        const response = await apiTienda.post('/usuario', data);
        console.log('Create user response:', response);
        return response.data;
    } catch (e) {
        console.error('Create user request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await apiTienda.put(`/usuario/${id}`, data);
        console.log('Update user response:', response);
        return response.data;
    } catch (e) {
        console.error('Update user request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
}