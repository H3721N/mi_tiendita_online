import React, { useState } from 'react';
import './LoginForm.css';
import { useLogin } from '../../shared/hooks/useLogin';
import { useForm } from 'react-hook-form';
import { Alert, FormLabel, Input } from "@mui/joy";
import Button from "@mui/joy/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { login, isLoading } = useLogin();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const onSubmit = handleSubmit(async (data) => {
      login(data.email, data.password).then((response) => {
          console.log(response)
          if (!response.success) {
              setErrorMessage(response.message);
          }
      });

    });

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>

            <div className='wrapper'>
                <h1 className='text-center'>Login</h1>
                {errorMessage && (
                    <Alert severity="error" color="danger">{errorMessage}</Alert>
                )}
                <form onSubmit={onSubmit}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Email</FormLabel>
                                <Input
                                    color="primary"
                                    variant="outlined"
                                    className="input-box"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <p className='msg-error'>{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <FormLabel className='label'>Password</FormLabel>
                                <Input
                                    color="primary"
                                    variant="outlined"
                                    className="input-box"
                                    type='password'
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <p className='msg-error'>{errors.password.message}</p>}
                            </div>
                        </div>
                        <br />
                        <div>
                            <Button type='submit' variant="outlined" color="neutral">
                                Login
                            </Button>
                            <div className='login-register-link'>
                                <p>No posees una cuenta? <a href="/register">Registrate</a></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};