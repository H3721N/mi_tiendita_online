import React from "react";
import './HomePage.css';
import ButtonAppBar from "../../components/navbar/Nabvar";
import MediaCard from "../../components/productCard/ProductCard.jsx";
import { useGetProduct } from "../../shared/hooks/useGetProduct.jsx";
import {CartProvider} from "../../context/cart.jsx";
import {Cart} from "../../components/Cart/Cart.jsx";

export const HomePage = () => {
    const [products, loading, error] = useGetProduct();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return(
        <div>
            <CartProvider>
                <div className='home-wrapper'>
                    <Cart/>
                    <div className='productGrid'>
                        {Array.isArray(products?.data) ? (
                            products.data.map(product => (
                                <MediaCard key={product.id} product={product}/>
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </CartProvider>
        </div>
    );
}
