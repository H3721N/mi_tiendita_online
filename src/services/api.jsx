import axios from 'axios';

const apiTienda = axios.create({
   baseURL: 'http://localhost:3000/api/v1',
    timeout: 10000,
});

apiTienda.interceptors.request.use((config) => {
    const userDetails = localStorage.getItem('token');
    if (userDetails) {
        try {
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        } catch (error) {
            console.log('Error al obtener el token', error)
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export const login = async (data) => {
    try {
        console.log('Sending login request with data:', data);
        const response = await apiTienda.post('/login', data);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        return response;
    } catch (e) {
        console.error('Login request failed:', e.response ? e.response.data : e.message);
        return {
            error: true,
            e
        };
    }
};

export default apiTienda;