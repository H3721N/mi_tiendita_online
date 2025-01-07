import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function ButtonAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (route) => {
        navigate(route);
        handleMenuClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const decodeJWT = (token) => {
        if (!token) {
            return null;
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const token = localStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const rol = decodedToken?.userRol || '';

    console.log('rol = ', rol);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 1)', zIndex: 1000 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleMenuItemClick('/home')}>Inicio</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('/register')}>Registro</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('/orden')}>Ordenes</MenuItem>
                        {rol === 'operador' && (
                            <>
                                <MenuItem onClick={() => handleMenuItemClick('/users')}>Usuarios</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/product')}>Productos</MenuItem>
                            </>
                        )}
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0.95, fontSize: '1rem' }}>
                        Mi tiendita online
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button color="inherit" style={{ fontSize: '0.9rem', marginLeft: '2.5rem' }} onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}