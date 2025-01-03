import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useGetOrden } from '../../shared/hooks/useGetOrden';
import Typography from "@mui/material/Typography";

const columns = [
    { id: 'id', label: 'ID de Orden', minWidth: 100 },
    { id: 'fecha', label: 'Fecha de Creación', minWidth: 170 },
    { id: 'nombre', label: 'Nombre Completo', minWidth: 170 },
    { id: 'direccion', label: 'Dirección', minWidth: 170 },
    { id: 'telefono', label: 'Teléfono', minWidth: 170 },
    { id: 'email', label: 'Correo Electrónico', minWidth: 170 },
    { id: 'fechaEntrega', label: 'Fecha de Entrega', minWidth: 170 },
    { id: 'total', label: 'Total de la Orden', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
    { id: 'negar', label: 'Botón', minWidth: 170 },
];

export default function OrdenList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ordenes, loading, error] = useGetOrden();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleButtonClick = (id) => {
        console.log(`El id de busqueda es: ${id}`);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                <h3 style={{fontWeight: 'bold'}}>Listado de ordenes</h3>
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(ordenes) && ordenes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage='Items por página'
                showFirstButton='true'
                showLastButton='true'
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={Array.isArray(ordenes) ? ordenes.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}