import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from "@mui/joy/Button";
import { Grid, Input } from "@mui/joy";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { useListUsers } from "../../shared/hooks/useListUsers";

const ControlerUser = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { users, loading, error, total } = useListUsers(page, rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'Rol', label: 'Rol', minWidth: 100 },
        { id: 'idEstado', label: 'Estado', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'nombre', label: 'Nombre', minWidth: 100 },
        { id: 'telefono', label: 'Telefono', minWidth: 100 },
        { id: 'idCliente', label: 'Cliente', minWidth: 100 },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Grid container spacing={2} className='row' justifyContent="center" alignItems="flex-start" sx={{ minHeight: '100vh', padding: 2 }}>
            <Grid xs={12} sm={12} md={12} lg={12}>
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: { xs: 2, sm: 3, md: 4 }, margin: { xs: 1, sm: 2 } }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        <h3 style={{ fontWeight: 'bold' }}>Listado de usuarios</h3>
                    </Typography>
                    <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(users) && users.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = column.id === 'Rol' ? row.Rol.nombre : row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : column.id === 'fechaCreacion' ? new Date(value).toLocaleDateString() : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[2, 10, 25]}
                        component="div"
                        labelRowsPerPage="Filas por página:"
                        count={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    )

}

export default ControlerUser;