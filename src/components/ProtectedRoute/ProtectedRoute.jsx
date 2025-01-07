import Button from "@mui/joy/Button";
import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    console.log('token = ', token);
    const navigate = useNavigate();

    const login = () => {
        navigate('/');
    }

    if (!token) {
        return (
            <div style={{ borderRadius: "3vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30vh', width: '20%', backgroundColor: 'rgba(0, 0, 0, 0.8)', margin: 'auto' }}>
                <h1 style={{ color: 'white' }}>Debes iniciar sesión</h1>
                <Button onClick={login}>Iniciar sesión</Button>
            </div>
        )
    }
    return children ? children : <Outlet />;
}

export const ProtectedFunctionOperador = ({ children }) => {
    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const rol = decodedToken.userRol;

    console.log('rol = ', rol);

    if (rol !== 'operador') {
        return (
            <div style={{ borderRadius: "3vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30vh', width: '20%', backgroundColor: 'rgba(0, 0, 0, 0.8)', margin: 'auto' }}>
                <h1 style={{ color: 'white' }}>No tienes permisos para usar esta funcion</h1>
            </div>
        )
    }

    return children ? children : <Outlet />;
}