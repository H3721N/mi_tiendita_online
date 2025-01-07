import React, { useEffect, useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Button from "@mui/joy/Button";
import { FormLabel, Grid, Input } from "@mui/joy";
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
import { useForm } from "react-hook-form";
import { useCreateUser } from "../../shared/hooks/useCreateUser";
import { useUpdateUser } from "../../shared/hooks/useUpdateUser";
import { Checkbox } from "@mui/material";

const ControlerUser = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { users, loading, error, total } = useListUsers(page, rowsPerPage);
    const { createUser, isAdding } = useCreateUser();
    const { handleUpdateUser } = useUpdateUser();
    const [isOperador, setIsOperador] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
        { id: 'estado', label: 'Estado', minWidth: 100 },
        { id: 'idEstado', label: 'Estado', minWidth: 100 },
        { id: 'nombre', label: 'Nombre', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'telefono', label: 'Telefono', minWidth: 100 },
        { id: 'button', label: 'Acciones', minWidth: 100 },
    ];

    const schema = yup.object().shape({
        email: yup.string().email('Email inválido').required('El email es requerido'),
        nombre: yup.string().required('El nombre es requerido'),
        password: yup.string().required('La contraseña es requerida'),
        telefono: yup.string().matches(/^\d{1,8}$/, 'El teléfono debe tener hasta 8 dígitos y solo puede contener números').required('El teléfono es requerido'),
        fechaNacimiento: yup.date().required('La fecha de nacimiento es requerida')
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'
    });

    useEffect(() => {
        console.log('Errors:', errors);
    }, [errors]);

    const onSubmit = async (data) => {
        const idRol = isOperador ? 1 : 2;
        const idEstado = isActive ? 5 : 6;
        if (editingUser) {
            const userData = {
                id: editingUser.id,
                idRol,
                idEstado,
                email: data.email,
                nombre: data.nombre,
                password: data.password,
                telefono: data.telefono,
                fechaNacimiento: data.fechaNacimiento,
                razonSocial: data.razonSocial,
                nombreComercial: data.nombreComercial,
                direccionEntrega: data.direccionEntrega
            };

            console.log('Updating user with data:', userData);
            handleUpdateUser(userData);
        } else {
            try {
                const response = await createUser({
                    idRol,
                    idEstado: 1,
                    email: data.email,
                    nombre: data.nombre,
                    password: data.password,
                    telefono: data.telefono,
                    fechaNacimiento: data.fechaNacimiento,
                    razonSocial: data.razonSocial,
                    nombreComercial: data.nombreComercial,
                    direccionEntrega: data.direccionEntrega
                });
                console.log('User created successfully:', response);
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }
        window.location.reload();
    };

const handleEditClick = (user) => {
    if (editingUser && editingUser.id === user.id) {
        setEditingUser(null);
        setIsEditing(false);
        setValue("idEstado", "");
        setValue("email", "");
        setValue("nombre", "");
        setValue("password", "");
        setValue("telefono", "");
        setValue("fechaNacimiento", "");
        setValue("razonSocial", "");
        setValue("nombreComercial", "");
        setValue("direccionEntrega", "");
        setIsOperador(false);
        setIsActive(false);
        console.log('Editing cancelled');
    } else {
        setEditingUser(user);
        setIsEditing(true);
        setValue("idEstado", user.idEstado);
        setValue("email", user.email);
        setValue("nombre", user.nombre);
        setValue("password", user.password);
        setValue("telefono", user.telefono);
        setValue("fechaNacimiento", user.fechaNacimiento);
        setValue("razonSocial", user.cliente?.razonSocial || "");
        setValue("nombreComercial", user.cliente?.nombreComercial || "");
        setValue("direccionEntrega", user.cliente?.direccionEntrega || "");
        setIsOperador(user.idRol === 1);
        setIsActive(user.idEstado === 5);
        console.log('Editing user:', user);
    }
};
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Grid container spacing={2} className='control-row' justifyContent="center" alignItems="flex-start" sx={{ minHeight: '100vh', padding: 3, '--Grid-columns': 'unset' }}>
            <Grid item xs={12} md={6} className='grid-crud'>
                <div className="control-wrapper">
                    Control de usuarios
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Email</FormLabel>
                                <Input variant="outlined"
                                       className="input-box" {...register("email", {required: true})} />
                                {errors.email && <p className='msg-error'>{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Nombre</FormLabel>
                                <Input variant="outlined"
                                       className="input-box" {...register("nombre", {required: true})} />
                                {errors.nombre && <p className='msg-error'>{errors.nombre.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Contraseña</FormLabel>
                                <Input type="password" variant="outlined"
                                       className="input-box" {...register("password", {required: true})} />
                                {errors.password && <p className='msg-error'>{errors.password.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Teléfono</FormLabel>
                                <Input variant="outlined"
                                       className="input-box" {...register("telefono", {required: true})} />
                                {errors.telefono && <p className='msg-error'>{errors.telefono.message}</p>}
                            </div>
                        </div>
                        <div className='control-row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Fecha de Nacimiento</FormLabel>
                                <Input type="date" variant="outlined"
                                       className="input-box" {...register("fechaNacimiento", {required: true})} />
                                {errors.fechaNacimiento &&
                                    <p className='msg-error'>{errors.fechaNacimiento.message}</p>}
                            </div>
                        </div>
                        {isEditing && (
                            <div className='control-row'>
                                <div className='col-lg-12'>
                                    <FormLabel className='label'>El usuario seguirá inactivo?</FormLabel>
                                    <Checkbox
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        sx={{color: '#ffffff'}}
                                    />
                                </div>
                            </div>
                        )}
                        {!isEditing && (
                            <div className='control-row'>
                                <div className='col-lg-12'>
                                    <FormLabel className='label'>El usuario es Operador?</FormLabel>
                                    <Checkbox
                                        checked={isOperador}
                                        onChange={(e) => setIsOperador(e.target.checked)}
                                        sx={{color: '#ffffff'}}
                                    />
                                </div>
                            </div>
                        )}
                        {!isOperador && (
                            <>
                                <div className='control-row'>
                                    <div className='col-lg-12'>
                                        <FormLabel className='label'>Razón Social</FormLabel>
                                        <Input variant="outlined"
                                               className="input-box" {...register("razonSocial", {required: true})} />
                                        {errors.razonSocial &&
                                            <p className='msg-error'>{errors.razonSocial.message}</p>}
                                    </div>
                                </div>
                                <div className='control-row'>
                                    <div className='col-lg-12'>
                                        <FormLabel className='label'>Nombre Comercial</FormLabel>
                                        <Input variant="outlined"
                                               className="input-box" {...register("nombreComercial", {required: true})} />
                                        {errors.nombreComercial &&
                                            <p className='msg-error'>{errors.nombreComercial.message}</p>}
                                    </div>
                                </div>
                                <div className='control-row'>
                                    <div className='col-lg-12'>
                                        <FormLabel className='label'>Dirección de Entrega</FormLabel>
                                        <Input variant="outlined"
                                               className="input-box" {...register("direccionEntrega", {required: true})} />
                                        {errors.direccionEntrega &&
                                            <p className='msg-error'>{errors.direccionEntrega.message}</p>}
                                    </div>
                                </div>
                            </>
                        )}
                        <Button type='submit' variant="outlined"
                                sx={{backgroundColor: '#ffffff', marginTop: 2, alignSelf: 'center', width: '100%'}}
                                className='btn-confirm' disabled={isAdding}>
                            {editingUser ? 'Actualizar' : 'Confirmar'}
                        </Button>
                    </form>
                </div>
            </Grid>
            <Grid item xs={12} md={6} className='table-wrapper'>
                <Paper sx={{
                    width: '100%',
                    overflow: 'hidden',
                    padding: {xs: 2, sm: 3, md: 4},
                    margin: {xs: 1, sm: 2}
                }}>
                    <Typography sx={{flex: '1 1 100%'}} variant="h6" id="tableTitle" component="div">
                        <h3 style={{fontWeight: 'bold'}}>Listado de usuarios</h3>
                    </Typography>
                    <TableContainer sx={{maxHeight: 440, overflowX: 'auto'}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}
                                                   style={{minWidth: column.minWidth}}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(users) && users.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            let value;
                                            if (column.id === 'Rol') {
                                                value = row.Rol.nombre;
                                            } else if (column.id === 'estado') {
                                                value = row.Estado.nombre;
                                            } else {
                                                value = row[column.id];
                                            }

                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'button' ? (
                                                    <Button onClick={() => handleEditClick(row)}>
                                                        {isEditing && editingUser?.id === row.id ? 'Cancelar' : 'Editar'}
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
}

export default ControlerUser;