import axios from 'axios';

const apiTienda = axios.create({
   baseURL: 'http://localhost:3000/desafio_web_360_backend',
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
        return await apiTienda().post('/auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export default apiTienda;