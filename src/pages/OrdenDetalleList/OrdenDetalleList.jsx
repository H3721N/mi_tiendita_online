import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const columns = [
    { id: 'idOrden', label: 'ID Orden' },
    { id: 'Producto', label: 'Producto' },    { id: 'cantidad', label: 'Cantidad' },
    { id: 'precio', label: 'Precio' },
    { id: 'subtotal', label: 'Subtotal' },
];

export default function OrdenDetalleList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const location = useLocation();
    const navigate = useNavigate();
    const { orderDetail, orders, isLoading, error, pagination, response } = location.state || {};

    useEffect(() => {
        if (!orderDetail) {
            navigate('/orden');
        }
    }, [orderDetail, navigate]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleButtonClick = (id) => {
        navigate(`/orderDetail/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error} </div>;
    }

    /*if (!orderDetail.orden || orderDetail.orden.length === 0) {
        return <span>Error: No se encontraron detalles de la orden</span>;
    }*/

    return (
        <Grid container spacing={2} className='row'
              justifyContent="center"
              alignItems="flex-start"
              sx={{ minHeight: '100vh', padding: 2 }}
        >
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Paper sx={{width: '100%', overflow: 'hidden',
                    padding: { xs: 2, sm: 3, md: 4 },
                    margin: { xs: 1, sm: 2 },}}>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >

                        <h3 style={{fontWeight: 'bold'}}>Listado de compras</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1">Nombre: {orders?.nombre}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1">Fecha: {orders?.fecha?.split('T')[0]}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1">Email: {orders?.email}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1">Total: {orders?.total}</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle1">Dirección: {orders?.direccion}</Typography>
                            </Grid>
                        </Grid>
                    </Typography>
                    <TableContainer sx={{maxHeight: 440, overflowX: 'auto'}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(orderDetail) && orderDetail
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = column.id === 'Producto' ? row.Producto.nombre : row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'negar' ? (
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => handleButtonClick(row.id)}
                                                                >
                                                                    Buscar Detalle
                                                                </Button>
                                                            ) : (
                                                                column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value
                                                            )}
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
                        showFirstButton={true}
                        showLastButton={true}
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={Array.isArray(orderDetail) ? orderDetail.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}