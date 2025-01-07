import { useState } from "react";
import * as jwt_decode from "jwt-decode";
import { getUserById } from "../../services/userService.jsx";
import { confirmPurchase } from "../../services/cartService.jsx";

export const useConfirmPurchase = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const handleConfirmPurchase = async (cart) => {
        setLoading(true);
        setError(null);

        try {
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

            const { id } = decodedToken;

            if (id) {
                const userData = await getUserById(id);
                if (userData.error) {
                    setError('No se pudo obtener el usuario.');
                    return;
                }
                setUser(userData);

                const total = cart.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
                const ordenDetalle = cart.map(item => ({
                    idProducto: item.idProducto,
                    cantidad: item.cantidad,
                    precio: item.precio
                }));

                const orderData = {
                    idUsuario: id,
                    idEstado: 5,
                    fecha: new Date().toISOString().split('T')[0], // Current date
                    nombre: userData.data.nombre,
                    direccion: userData.data.direccion,
                    telefono: userData.data.telefono,
                    email: userData.data.email,
                    fechaEntrega: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], // Next day
                    total: cart.reduce((acc, item) => acc + item.quantity * item.precios, 0),
                    ordenDetalle: cart.map(item => ({
                        idProducto: item.id,
                        cantidad: item.quantity,
                        precio: item.precios
                    }))
                };

                const response = await confirmPurchase(orderData);
                if (response.error) {
                    setError('No se pudo confirmar la compra.');
                    return;
                }

                window.location.reload();
            }

        } catch (error) {
            console.error("Error al procesar el carrito:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { handleConfirmPurchase, loading, error };
};