import React from 'react';
import './LoginForm.css'
import { LuCircleUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLogin } from '../../shared/hooks/useLogin';
import { useForm } from 'react-hook-form';
import {Checkbox, Input} from "@mui/joy";
import Button from "@mui/joy/Button";

export const LoginForm = () => {
    const { login, isLoading } = useLogin();
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit( (data) => {
        console.log(data);
        login(data.email, data.password);
    });

    return (
        <div className='login-wrapper'>
            <form onSubmit={onSubmit}>
                <h1>Iniciar sesi$on</h1>
                <div className='login-input-box'>
                    <Input className="login-input-box"
                        placeholder="Email"
                        color="primary"
                        variant="outlined"
                        {...register("email", { required: true })}
                    />
                    <LuCircleUser className='icon'/>
                </div>
                <div className='login-input-box'>
                    <Input
                        className="login-input-box"
                        placeholder="Password"
                        color="primary"
                        variant="outlined"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <RiLockPasswordLine className='icon'/>
                </div>
                <div className='login-remember-forgot'>
                    <Checkbox color="primary" className="login-remember-forgot"/>
                    <a href='#' className='login-remember-forgot'>Forgot password?</a>
                </div>
                <Button type='submit' color="primary" className='login-button'>
                    Login
                </Button>
                <div className='login-register-link'>
                    <p>No posees una cuenta? <a href="/register">Registrate</a></p>
                </div>
            </form>
        </div>
    );
};

