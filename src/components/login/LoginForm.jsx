import React from 'react';
import './LoginForm.css'
import { LuCircleUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLogin } from '../../shared/hooks/useLogin';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
    const { login, isLoading } = useLogin();
    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit( (data) => {
        console.log(data);
        login(data.email, data.password);
    });

    return (
        <div className='wrapper'>
            <form onSubmit={onSubmit}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        required
                        {...register("email", {required: true})}
                    />
                    <LuCircleUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        {...register("password", {required: true})}
                    />
                    <RiLockPasswordLine className='icon'/>
                </div>
                <div className='remember-forgot'>
                    <label>
                        <input type='checkbox'/> Remember me
                    </label>
                    <a href='#'>Forgot password?</a>
                </div>
                <button  type='submit'>Login</button>
                <div className='register-link'>
                    <p>No posees una cuenta? <a href="#">Registrate</a></p>
                </div>
            </form>
        </div>
    );
};

