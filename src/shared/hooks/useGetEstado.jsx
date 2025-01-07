import { useState, useEffect} from "react";
import { getEstados } from "../../services/estadoService.jsx";

export const useGetEstado = () => {
    const [estados, setEstados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEstados = async () => {
        try {
            const response = await getEstados();
            if (response.data) {
                setEstados(response.data);
                console.log('estados:', response);
            } else {
                setError(new Error('Failed to fetch estados'));
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstados();
    }, []);

    return { estados, loading, error };
}