import React, {useState} from "react";
import './HomePage.css';
import MediaCard from "../../components/productCard/ProductCard.jsx";
import {useGetProduct} from "../../shared/hooks/useGetProduct.jsx";
import {CartProvider} from "../../context/cart.jsx";
import {Cart} from "../../components/Cart/Cart.jsx";
import {Pagination, useTheme} from "@mui/material";
import Slider from "@mui/material/Slider";
import {color} from "@mui/system";

export const HomePage = () => {
    const [page, setPage] = useState(-1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [priceRange, setPriceRange] = useState([0, 9999]);
    const { products: filteredProducts  , loading, error, total, totalPages } = useGetProduct(page, rowsPerPage, priceRange[0], priceRange[1]);
    const theme = useTheme();

    const handleChangePriceRange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage-1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 20));
        setPage(0);
    };

    if (loading ) return <p>Loading...</p>;
    if (error ) return <p>Error: {error.message || errorFiltered.message}</p>;

    return (
        <div>
            <CartProvider>
                <div className='home-wrapper'>

                    <Cart/>
                    <h1 style={{color: "white"}}>Rango de precios:</h1>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={priceRange}
                        min={0}
                        max={10000}
                        onChange={handleChangePriceRange}
                        valueLabelDisplay="auto"
                    />
                    <div>

                    </div>
                    <div className='productGrid'>
                        {Array.isArray(filteredProducts) ? (
                            filteredProducts.map(product => (
                                <MediaCard key={product.id} product={product}/>
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                    <Pagination sx={{backgroundColor: "white", width: "100%", marginTop: "10px", padding: "5px"}} count={totalPages} color="primary" onChange={handleChangePage}/>
                </div>
            </CartProvider>
        </div>
    );
};