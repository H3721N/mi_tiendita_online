import axios from 'axios';

const apiTienda = axios.create({
   baseURL: 'http://localhost:3000/api/v1',
    timeout: 10000,
});

apiTienda.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // o desde donde obtengas el token
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default apiTienda;