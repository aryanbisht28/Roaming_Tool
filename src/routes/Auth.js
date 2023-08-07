import MinimalLayout from '../layout/MinimalLayout';
import Login from '../views/Login/index.jsx';
import Signup from '../views/Signup/index.jsx';
import User from '../views/user/index.js';
import EmailVerify from 'views/EmailVerify';
const LoginRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/users/:id/verify/:token',
            element: <EmailVerify />
        }
    ]
};
export default LoginRoutes;
