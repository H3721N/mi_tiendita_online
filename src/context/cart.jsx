import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};



export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1, stock: item.stock -1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1, stock: product.stock - 1 }];
            }
        });
    };

    const decreaseFromCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct && existingProduct.quantity > 1) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity - 1, stock: item.stock + 1 } : item
                );
            } else {
                return prevCart.filter(item => item.id !== product.id);
            }
        });
    };

    const removeCart = product => {
        setCart(prevState => prevState.filter(item => item.id !== product.id));
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeCart, decreaseFromCart }}>
            {children}
        </CartContext.Provider>
    );
}