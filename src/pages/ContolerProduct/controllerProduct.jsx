import React, { useState } from 'react';
import Button from "@mui/joy/Button";
import { Autocomplete, FormLabel, Grid, Input, TextField } from "@mui/joy";
import { useAddProduct } from "../../shared/hooks/useAddProduct.jsx";
import { useGetProduct } from "../../shared/hooks/useGetProduct.jsx";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useGetEstado } from "../../shared/hooks/useGetEstado.jsx";
import './ControllerProduct.css';
import MenuItem from "@mui/material/MenuItem";
import { useUpdateProduct } from "../../shared/hooks/useUpdatePorduct.jsx";

const ControllerProduct = () => {
    const [open, setOpen] = React.useState(false);
    const { addProduct, isAdding } = useAddProduct();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { products, loading, error, total, categories } = useGetProduct(page, rowsPerPage);
    const [imagePreview, setImagePreview] = useState(null);
    const { estados } = useGetEstado();
    const [editingProduct, setEditingProduct] = useState(null);
    const { handleUpdateProduct } = useUpdateProduct();

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const formatDate = (dateString) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setValue("foto", base64String);
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const schema = yup.object().shape({
        idCategoria: yup.string().required('El id de la categoría es requerido'),
        nombre: yup.string().required('El nombre es requerido'),
        marca: yup.string().required('La marca es requerida'),
        codigo: yup.string().required('El código es requerido'),
        stock: yup.number().integer('El stock debe ser un número entero').required('El stock es requerido'),
        idEstado: yup.string().required('El estado es requerido'),
        precios: yup.string().required('El precio es requerido'),
        foto: yup.mixed().required('La foto es requerida')
    });

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const onSubmit = (data) => {
        if (editingProduct) {
            const productData = {
                id: editingProduct.id,
                idCategoria: +data.idCategoria,
                idUsuario: idUsuario,
                nombre: data.nombre,
                marca: data.marca,
                codigo: data.codigo,
                stock: data.stock,
                idEstado: data.idEstado,
                precios: data.precios,
                fechaCreacion: new Date().toISOString().split('T')[0],
                foto: data.foto
            };

            handleUpdateProduct(productData);
            console.log('Updating product:', data);
        } else {
            console.log('Adding product:', data);
            addProduct(
                +data.idCategoria,
                idUsuario,
                data.nombre,
                data.marca,
                data.codigo,
                data.stock,
                data.idEstado,
                data.precios,
                new Date().toISOString().split('T')[0],
                data.foto
            );
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setValue("idCategoria", product.idCategoria);
        setValue("nombre", product.nombre);
        setValue("marca", product.marca);
        setValue("codigo", product.codigo);
        setValue("stock", product.stock);
        setValue("idEstado", product.idEstado);
        setValue("precios", product.precios);
        setImagePreview(product.foto);
        console.log('Editing product:', product);
    };

    const columns = [
        { id: 'id', label: 'ID', minWidth: 100 },
        { id: 'nombre', label: 'Nombre', minWidth: 170 },
        { id: 'marca', label: 'Marca', minWidth: 170 },
        { id: 'codigo', label: 'Código', minWidth: 170 },
        { id: 'stock', label: 'Stock', minWidth: 100 },
        { id: 'precios', label: 'Precio', minWidth: 100 },
        { id: 'fechaCreacion', label: 'Fecha de Creación', minWidth: 170 },
        { id: 'button', label: 'Acciones', minWidth: 100 },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Grid container spacing={2} className='control-row' justifyContent="center" alignItems="flex-start" sx={{ minHeight: '100vh', padding: 3, '--Grid-columns': 'unset' }}>
            <Grid item xs={12} className='grid-crud'>
                <div className="control-wrapper">
                    Control de productos
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='control-row'>
                            <div className='col-lg-12' >
                                <Controller
                                    name="idCategoria"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="col-lg-12">
                                            <Autocomplete
                                                {...field}
                                                options={categories}
                                                noOptionsText={'No hay opciones'}
                                                getOptionLabel={(option) => option.nombre}
                                                className='auto-complete-custom'
                                                value={categories.find(option => option.id === field.value) || null}
                                                onChange={(event, value) => field.onChange(value ? value.id : '')}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Categoria"
                                                        error={!!errors.idCategoria}
                                                        helperText={errors.idCategoria ? errors.idCategoria.message : ''}
                                                        sx={{ width: '100% !important', paddingRight: '40px' }}
                                                    />
                                                )}
                                                disableClearable
                                                sx={{ width: '100% !important' }}
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Nombre</FormLabel>
                                <Input variant="outlined" className="input-box" {...register("nombre", { required: true })} />
                                {errors.nombre && <p className='msg-error'>{errors.nombre.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Marca</FormLabel>
                                <Input variant="outlined" className="input-box" {...register("marca", { required: true })} />
                                {errors.marca && <p className='msg-error'>{errors.marca.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Codigo</FormLabel>
                                <Input variant="outlined" className="input-box" {...register("codigo", { required: true })} />
                                {errors.codigo && <p className='msg-error'>{errors.codigo.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Stock</FormLabel>
                                <Input variant="outlined" className="input-box" {...register("stock", { required: true })} />
                                {errors.stock && <p className='msg-error'>{errors.stock.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Estado</FormLabel>
                                <Controller
                                    name="idEstado"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            options={estados}
                                            noOptionsText={'No hay opciones'}
                                            getOptionLabel={(option) => option.nombre}
                                            className='auto-complete-custom'
                                            value={estados.find(option => option.id === field.value) || null}
                                            onChange={(event, value) => field.onChange(value ? value.id : '')}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Estado"
                                                    error={!!errors.idEstado}
                                                    helperText={errors.idEstado ? errors.idEstado.message : ''}
                                                    sx={{ width: '100% !important', paddingRight: '40px' }}
                                                />
                                            )}
                                            disableClearable
                                            sx={{ width: '100% !important' }}
                                        />
                                    )}
                                />
                                {errors.idEstado && <p className='msg-error'>{errors.idEstado.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Precio</FormLabel>
                                <Input variant="outlined" className="input-box" {...register("precios", { required: true })} />
                                {errors.precios && <p className='msg-error'>{errors.precios.message}</p>}
                            </div>
                        </div>
                        <div className='control-row control-input-img'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Foto</FormLabel>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="input-box-img"
                                    style={{ display: 'none' }}
                                    {...register("fotoArray", { required: true })}
                                    onChange={handleFileChange}
                                    aria-invalid="false"
                                />
                                <label htmlFor="fileInput">
                                    {imagePreview ? 'Cambiar foto' : 'Seleccionar foto'}
                                </label>
                                {errors.foto && <p className='msg-error'>{errors.foto.message}</p>}
                                {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', marginLeft: '30px', width: '50%', height: '50%' }} />}
                                {!imagePreview && (
                                    <div
                                        style={{ height: '100px', width: '100%', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        No image selected
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button type='submit' variant="outlined" sx={{ backgroundColor: '#ffffff', marginTop: 2, alignSelf: 'center' , width: '100%'}} className='btn-confirm' disabled={isAdding}>
                            {editingProduct ? 'Actualizar' : 'Confirmar'}
                        </Button>
                    </form>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className='table-wrapper'>
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: { xs: 2, sm: 3, md: 4 }, margin: { xs: 1, sm: 2 } }}>
                    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                        <h3 style={{ fontWeight: 'bold' }}>Listado de productos</h3>
                    </Typography>
                    <TableContainer sx={{ maxHeight: 570, overflowX: 'auto' }}>
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
                                {Array.isArray(products) && products.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            let value = row[column.id];
                                            if (column.id === 'fechaCreacion') {
                                                value = formatDate(row.fechaCreacion);
                                            }
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'button' ? (
                                                        <Button onClick={() => handleEditClick(row)}>Editar</Button>
                                                    ) : (
                                                        column.format && typeof value === 'number' ? column.format(value) : value
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
        </Grid>    );
};

export default ControllerProduct;