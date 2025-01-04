import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes.jsx';
import ButtonAppBar from "./components/navbar/Nabvar.jsx";
import React from "react";
import { CartProvider } from "./context/cart.jsx";
import { Footer } from "./components/Footer/Footer.jsx";

function App() {
    return (
        <Router>
            <div>
                <ButtonAppBar />
                <CartProvider>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                    {/*<Footer />*/}
                </CartProvider>
            </div>
        </Router>
    );
}

export default App;