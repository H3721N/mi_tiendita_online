import { useState, useEffect} from "react";
import { getUsers } from "../../services/userService";

export const useListUsers = (page, rowsPerPage) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);

    const fetchUsers = async () => {
        try {
            const response = await getUsers(page + 1, rowsPerPage);
            console.log('Response:', response);
            if (response.success) {
                setUsers(response.data);
                setTotal(response.pagination.totalItems);
                console.log('total:', response);
            } else {
                setError(new Error('Failed to fetch users'));
            }
            setLoading(false);
        }catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [page, rowsPerPage]);

    console.log('users:', users);

    return { users, loading, error, total };
}