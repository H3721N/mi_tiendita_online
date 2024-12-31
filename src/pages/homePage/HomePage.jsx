import React from "react";
import './HomePage.css';
import ButtonAppBar from "../../components/navbar/Nabvar";
import MediaCard from "../../components/productCard/ProductCard.jsx";
import { useGetProduct } from "../../shared/hooks/useGetProduct.jsx";

export const HomePage = () => {
    const [products, loading, error] = useGetProduct();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return(
        <div>
            <ButtonAppBar />
            <div className='home-wrapper'>
                <h1>Home Page</h1>
                {Array.isArray(products?.data) ? (
                    products.data.map(product => (
                        console.log('product', product),
                            <MediaCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}
