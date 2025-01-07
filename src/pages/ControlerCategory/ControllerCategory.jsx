import React, { useState } from 'react';
import { Grid, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { useGetCategory } from "../../shared/hooks/useGetCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormLabel, Input } from "@mui/joy";
import Button from "@mui/joy/Button";
import { useAddCategory } from "../../shared/hooks/useAddCategory.jsx";
import { useUpdateCategory } from "../../shared/hooks/useUpdateCategory.jsx";
import './ControllerCategory.css';

const ControllerCategory = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const { category, loading, error, total } = useGetCategory(page, rowsPerPage);
    const { addCategory, isAdding } = useAddCategory();
    const { handleUpdateCategory } = useUpdateCategory();
    const [editingCategory, setEditingCategory] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const columns = [
        { id: 'idUsuario', label: 'ID Usuario', minWidth: 50 },
        { id: 'nombre', label: 'Nombre', minWidth: 100 },
        { id: 'idEstado', label: 'ID Estado', minWidth: 100 },
        { id: 'fechaCreacion', label: 'Fecha de Creación', minWidth: 150 },
        { id: 'button', label: 'Acciones', minWidth: 100 }
    ];

    const schema = yup.object().shape({
        nombre: yup.string().required('El nombre es requerido'),
        idEstado: yup.number().required('El ID de estado es requerido')
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: {
            fechaCreacion: new Date().toISOString().split('T')[0]
        }
    });

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
    const idUsuario = decodedToken.id;

    const onSubmit = async (data) => {
        const categoryData = {
            idUsuario: idUsuario,
            nombre: data.nombre,
            idEstado: data.idEstado,
            fechaCreacion: data.fechaCreacion
        };

        if (editingCategory) {
            categoryData.id = editingCategory.id;
            await handleUpdateCategory(categoryData);
            toast.success('Categoría actualizada exitosamente');
        } else {
            await addCategory(categoryData.idUsuario, categoryData.nombre, categoryData.idEstado, categoryData.fechaCreacion);
            toast.success('Categoría agregada exitosamente');
        }
        window.location.reload();
    };

    const handleEditClick = (category) => {
        if (editingCategory && editingCategory.id === category.id) {
            setEditingCategory(null);
            setIsEditing(false);
            setValue("idUsuario", "");
            setValue("nombre", "");
            setValue("idEstado", "");
            setValue("fechaCreacion", "");
        } else {
            setEditingCategory(category);
            setIsEditing(true);
            setValue("idUsuario", category.idUsuario);
            setValue("nombre", category.nombre);
            setValue("idEstado", category.idEstado);
            setValue("fechaCreacion", category.fechaCreacion);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
    };


    return (
        <Grid container spacing={2} className='control-row' justifyContent="center" alignItems="flex-start" sx={{ minHeight: '100vh', padding: 3, '--Grid-columns': 'unset' }}>
            <div className="control-wrapper">
                <Typography variant="h6" component="div">
                    <h3 style={{ fontWeight: 'bold' }}>{isEditing ? 'Editar Categoría' : 'Agregar Categoría'}</h3>
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='control-row'>
                        <FormLabel className='label'>Nombre</FormLabel>
                        <Input variant="outlined" className="input-box" {...register('nombre')} />
                        {errors.nombre && <p className='msg-error'>{errors.nombre.message}</p>}
                    </div>
                    <div className='control-row'>
                        <FormLabel className='label'>ID Estado</FormLabel>
                        <Input variant="outlined" className="input-box" {...register('idEstado')} />
                        {errors.idEstado && <p className='msg-error'>{errors.idEstado.message}</p>}
                    </div>
                    <Button type='submit' variant="outlined" sx={{ backgroundColor: '#ffffff', marginTop: 2, alignSelf: 'center', width: '100%' }} className='btn-confirm' disabled={isAdding}>
                        {isEditing ? 'Actualizar' : 'Confirmar'}
                    </Button>
                </form>
            </div>
            <Grid item xs={12} md={6} className='table-wrapper'>
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: { xs: 2, sm: 3, md: 4 }, margin: { xs: 1, sm: 2 } }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        <h3 style={{ fontWeight: 'bold' }}>Listado de Categorías</h3>
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
                                {Array.isArray(category) && category.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            if (column.id === 'fechaCreacion') {
                                                value = formatDate(row.fechaCreacion);
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'button' ? (
                                                        <Button onClick={() => handleEditClick(row)}>
                                                            {isEditing && editingCategory?.id === row.id ? 'Cancelar' : 'Editar'}
                                                        </Button>
                                                    ) : (
                                                        value
                                                    )}
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
    );
};

export default ControllerCategory;