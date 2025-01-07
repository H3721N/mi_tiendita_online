import { HomePage } from './pages/HomePage/HomePage.jsx';
import { LoginForm } from './components/login/LoginForm.jsx';
import { RegisterForm } from "./components/RegisterForm/RegisterForm.jsx";
import OrdenList from "./pages/OrdenList/OrdenList.jsx";
import OrderDetail from "./pages/OrdenDetalleList/OrdenDetalleList.jsx";
import ControllerProduct from "./pages/ContolerProduct/controllerProduct.jsx";
import ControlerUser from "./pages/ControlerUser/ControlerUser.jsx";
import { ProtectedRoute, ProtectedFunctionOperador } from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ControllerCategory from "./pages/ControlerCategory/ControllerCategory.jsx";

const routes = [
    { path: '/', element: <LoginForm /> },
    { path: '/home', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
    { path: '/register', element: <RegisterForm /> },
    { path: '/orden', element: <ProtectedRoute><OrdenList /></ProtectedRoute> },
    { path: '/orderDetail/:id', element: <ProtectedRoute><OrderDetail /></ProtectedRoute> },
    { path: '/product', element: <ProtectedRoute><ProtectedFunctionOperador><ControllerProduct /></ProtectedFunctionOperador></ProtectedRoute> },
    { path: '/users', element: <ProtectedRoute><ProtectedFunctionOperador><ControlerUser /></ProtectedFunctionOperador></ProtectedRoute> },
    { path: '/category', element: <ProtectedRoute><ProtectedFunctionOperador><ControllerCategory /></ProtectedFunctionOperador></ProtectedRoute> },
];

export default routes;