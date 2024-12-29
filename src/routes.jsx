import { HomePage } from './pages/homePage/HomePage.jsx';
import { LoginForm } from './components/login/LoginForm.jsx';
import { RegisterForm} from "./components/RegisterForm/RegisterForm.jsx";

const routes = [
    { path: '/auth', element: <LoginForm /> },
    { path: '/home', element: <HomePage /> },
    { path: '/register', element: <RegisterForm /> }
]

export default routes;