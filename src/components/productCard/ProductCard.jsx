import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate} from "react-router-dom";
import { useState} from "react";

export default function MediaCard({product}) {

    const [showAddReservation, setShowAddReservation] = useState(false);
    const navigate = useNavigate();

    const handleToggleAddReservation = () => {
        setShowAddReservation(!showAddReservation);
    };


    const base64Image = `data:image/jpeg;base64,${product.foto}`;

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
                <Typography variant="body2" sx={{ color: product.stock === 0 ? 'error.main' : 'text.secondary' }}>
                    {product.stock === 0 ? 'sin stock' : `stock: ${product.stock}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    disabled={product.stock === 0}
                    //onClick={() => agregarAlCarrito(producto)}
                >
                    agregar al carrito
                </Button>
            </CardActions>
        </Card>
    );
}

function byteArrayToBase64(byteArray) {
    let binary = '';
    const len = byteArray.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    return btoa(binary);
}