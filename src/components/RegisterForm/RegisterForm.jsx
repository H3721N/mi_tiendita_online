import React from "react";
import './RegisterForm.css';
import {FormLabel, Input} from "@mui/joy";
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import { keyframes } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { useRegister} from "../../shared/hooks/useRegister.jsx";

const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

export const RegisterForm = () => {
    const [open, setOpen] = React.useState(false);
    const { registerUser, isRegister } = useRegister();
    const schema = yup.object().shape({
        nombre: yup.string().max(75).required('El nombre es necesario'),
        telefono: yup.string().matches(/^\d+$/, 'El teléfono solo debe contener números').required(),
        email: yup.string().email('email invalido').max(50).required('email es necesario'),
        fechaNacimiento: yup.string().required('feche de nacimiento es necesaria'),
        nombreComercial: yup.string('nombre comercial es necesario').max(345).required(),
        razonSocial: yup.string().max(245).required('razon social es necesaria'),
        direccionEntrega: yup.string().max(45).required('direccion de entrega es necesaria'),
        password: yup.string().min(6, "Debe ingresar al menos 6 caracteres").max(100).required('contraseña es necesaria'),
        confirmPassword: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').
        max(100).oneOf([yup.ref('password'), null],
            'Las contraseñas deben coincidir').required('contraseña es necesaria'),
    });

    const { register,
        handleSubmit,
        formState:{errors} } = useForm({
         resolver: yupResolver(schema),
        mode: 'all',
    });

    const animationDuration = 600;

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = ( (data) => {
        registerUser(data.nombre, data.telefono, data.email, data.fechaNacimiento, data.nombreComercial,
            data.razonSocial, data.direccionEntrega, data.password, data.confirmPassword);
    })

    return(
        <div className='wrapper'>
            <h1>RegisterForm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <FormLabel className='label'>Nombre</FormLabel>
                            <Input color="primary" variant="outlined" className="input-box"
                                   {...register("nombre", { required: true })}
                            />
                            {errors.nombre && <p className='msg-error'>{errors.nombre.message}</p>}
                        </div>
                        <div className='col-lg-5'>
                            <FormLabel className='label'>T&eacute;lefono</FormLabel>
                            <Input
                                variant="outlined"
                                className="input-box"

                                slotProps={{
                                    input: {
                                        maxLength: 8, pattern: "\\d{8}", max: 99999999,
                                        minLength: 8, title: "El teléfono debe tener 8 dígitos",
                                    }
                                }}
                                {...register("telefono", { required: true })}
                            />
                            {errors.telefono && <p className='msg-error'>{errors.telefono.message}</p>}
                        </div>
                        <div className='col-lg-7'>
                            <FormLabel className='label'>Correo electr&oacute;nico</FormLabel>
                            <Input color="primary" variant="outlined"
                                   className="input-box"
                                  {...register("email", { required: true })}
                            />
                            {errors.email && <p className='msg-error'>{errors.email.message}</p>}
                        </div>
                        <div className='col-lg-5'>
                            <FormLabel className='label'>Fecha de nacimiento</FormLabel>
                            <Input
                                className="input-box"
                                variant="outlined"
                                color="primary"
                                type="date"
                                slotProps={{
                                    input: {
                                        placeholder: 'A placeholder',
                                        min: '2006-12-28',
                                        max: new Date().toISOString().split('T')[0].split('-').reverse().join('-'),
                                    },
                                }}
                                {...register("fechaNacimiento", { required: true })}
                            />
                            {errors.fechaNacimiento && <p className='msg-error'>{errors.fechaNacimiento.message}</p>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <FormLabel className='label'>Nombre comercial</FormLabel>
                            <Input variant="outlined" className="input-box"
                                   {...register("nombreComercial", { required: true })}
                            />
                            {errors.nombreComercial && <p className='msg-error'>{errors.nombreComercial.message}</p>}
                        </div>
                        <div className='col-lg-5'>
                            <FormLabel className='label'>Raz&oacute;n Social</FormLabel>
                            <Input variant="outlined" className="input-box"
                                      {...register("razonSocial", { required: true })}
                            />
                            {errors.razonSocial && <p className='msg-error'>{errors.razonSocial.message}</p>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <FormLabel className='label'>Direcci&oacute;n</FormLabel>
                            <Input variant="outlined" className="input-box"
                                   {...register("direccionEntrega", { required: true })}
                            />
                            {errors.direccionEntrega && <p className='msg-error'>{errors.direccionEntrega.message}</p>}
                        </div>

                    </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Contraseña</FormLabel>
                                <Input color="primary" variant="outlined"
                                       className="input-box"
                                       type='password'
                                       {...register("password", { required: true })}
                                />
                                {errors.password && <p className='msg-error'>{errors.password.message}</p>}
                            </div>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Confirmar Contraseña</FormLabel>
                                <Input color="primary" variant="outlined"
                                       className="input-box"
                                       type='password'
                                       {...register("confirmPassword", { required: true })}
                                />
                            </div>
                            {errors.confirmPassword && <p className='msg-error'>{errors.confirmPassword.message}</p>}
                        </div>

                    </div>
                    <br/>
                    <div>
                        <Button type='submit' variant="outlined" color="neutral" onClick={handleClick}>
                            Show Snackbar
                        </Button>
                        <Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={4000}
                            animationDuration={animationDuration}
                            sx={[
                                open && {
                                    animation: `${inAnimation} ${animationDuration}ms forwards`,
                            },
                            !open && {
                                animation: `${outAnimation} ${animationDuration}ms forwards`,
                            },
                        ]}
                    >
                        Se ha registrado un nuevo usuario
                    </Snackbar>
                </div>
            </form>
        </div>
    );
}