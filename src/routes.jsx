import { HomePage } from './pages/homePage/HomePage.jsx';
import { LoginForm } from './components/login/LoginForm.jsx';

const routes = [
    { path: '/auth', element: <LoginForm /> },
    { path: '/home', element: <HomePage /> },
]

export default routes;