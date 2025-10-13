import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import VerifyPage from '@/pages/Auth/VerifyPage';
import BusinessForm from '@/pages/Business/BusinessForm';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/business-form',
    element: <BusinessForm />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verify',
    element: <VerifyPage />,
  },



]);
