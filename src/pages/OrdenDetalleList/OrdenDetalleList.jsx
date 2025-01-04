import React from 'react';
import { Grid, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useOrdenById } from '../../shared/hooks/useordenDetalleById';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'idOrden', label: 'ID Orden' },
    { id: 'idProducto', label: 'ID Producto' },
    { id: 'cantidad', label: 'Cantidad' },
    { id: 'precio', label: 'Precio' },
    { id: 'subtotal', label: 'Subtotal' },
    { id: 'Producto', label: 'Producto' },
    { id: 'negar', label: 'Botón' }
];

export default function OrdenDetalleList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedOrderId, setSelectedOrderId] = React.useState(null);
    const { orderDetail, isLoading, error } = useOrdenById(selectedOrderId);
    const navigate = useNavigate();

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
        return <div>Error: {error}</div>;
    }

    return (
        <Grid container spacing={2} className='row'
              justifyContent="center"
              alignItems="flex-start"
              sx={{ minHeight: '100vh', padding: 2 }}
        >
            <Grid xs={12} sm={12} md={12} lg={12}>
                <Paper sx={{width: '100%', overflow: 'hidden',
                    padding: { xs: 2, sm: 3, md: 4 },
                    margin: { xs: 1, sm: 2 },}}>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        <h3 style={{fontWeight: 'bold'}}>Listado de ordenes</h3>
                    </Typography>
                    <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
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
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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