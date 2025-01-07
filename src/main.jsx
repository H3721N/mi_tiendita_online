import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './context/cart.jsx';
import './index.css';
import ButtonAppBar from "./components/navbar/Nabvar.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </React.StrictMode>,
    document.getElementById('root')
);