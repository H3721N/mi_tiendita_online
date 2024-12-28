import React from 'react';
import './LoginFrom.css'
import { LuCircleUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required/>
                    <LuCircleUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Password' required/>
                    <RiLockPasswordLine className='icon'/>
                </div>
                <div className='remember-forgot'>
                    <label>
                        <input type='checkbox'/> Remember me
                    </label>
                    <a href='#'>Forgot password?</a>
                </div>
                <button type='submit'>Login</button>
                <div className='register-link'>
                    <p>No posees una cuenta? <a href="#">Registrate</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;