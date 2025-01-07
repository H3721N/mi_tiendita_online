import { FaCartPlus } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { useEffect, useId } from "react";
import './Cart.css';
import { useCart } from "../../shared/hooks/useCart.js";
import { useConfirmPurchase } from "../../shared/hooks/useConfirmPurchase.jsx";

export function CartItem({ product, addToCart, decreaseFromCart }) {


    const base64Image = `data:image/jpeg;base64,${product.foto}`;

    return (
        <li>
            <img src={base64Image} alt={product.marca}/>
            <div>
                <h3>{product.nombre}</h3>
                <p>${product.precios}</p>
            </div>
            <footer>
                <small onClick={addToCart}>
                    Disponible: {product.stock} -
                    Qty: {product.quantity}
                </small>
            </footer>
            <button onClick={decreaseFromCart}>-</button>
            <button onClick={addToCart} disabled={product.stock <= 1}>+</button>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const {cart, clearCart, addToCart, decreaseFromCart } = useCart();
    const { handleConfirmPurchase, loading, error } = useConfirmPurchase();

    useEffect(() => {
        console.log('Cart updated:', cart);
    }, [cart]);


    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <FaCartPlus />
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />

            <aside className='cart'>
                <ul>
                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            product={product}
                            addToCart={() => addToCart(product)}
                            decreaseFromCart={() => decreaseFromCart(product)}
                        />
                    ))}
                </ul>
                <button onClick={clearCart}>
                    <BsCartXFill/>
                </button>
                <button onClick={() => handleConfirmPurchase(cart, clearCart)} disabled={loading}>
                    Confirmar Compra
                </button>
            </aside>
        </>
    );
}