import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate} from "react-router-dom";
import { useState} from "react";
import { useCart} from "../../shared/hooks/useCart.js";
import {BsCartXFill} from "react-icons/bs";
import {FaCartPlus} from "react-icons/fa";

export default function MediaCard({product}) {

    const { addToCart, cart, removeCart } = useCart();

    const [showAddReservation, setShowAddReservation] = useState(false);
    const navigate = useNavigate();

    const handleToggleAddReservation = () => {
        setShowAddReservation(!showAddReservation);
    };


    const base64Image = `data:image/jpeg;base64,${product.foto}`;

    const checkProductInCart = (product) => {
        return cart.find(item => item.id === product.id);
    }

    const isProductInCart = checkProductInCart(product);

    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={base64Image}
                title={product.nombre}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.nombre}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    marca: {product.marca}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    precio: {product.precios}
                </Typography>
                <Typography variant="body2" sx={{ color: product.stock === 0 ? 'error.main' : 'text.secondary' }}>
                    {product.stock === 0 ? 'sin stock' : `stock: ${product.stock}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }} onClick={() => {
                    isProductInCart
                        ? removeCart(product)
                        : addToCart(product)
                    }}
                    disabled={product.stock <= 1}
                >
                    {
                        isProductInCart ? <BsCartXFill/> : <FaCartPlus/>
                    }
                </Button>
            </CardActions>
        </Card>
    );
}
