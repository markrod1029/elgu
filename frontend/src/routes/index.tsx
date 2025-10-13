import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import VerifyPage from '@/pages/Auth/VerifyPage';
import DashboardPage from '@/pages/Dashboard/DashboardPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import MainLayout from '@/layout/main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    ),
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
  {
    path: '/dashboard',
    element: (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    ),
  },
  {
    path: '/mayors-desk',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/government',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/city-programs',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/qc-e-services',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/public-notices',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/media',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/peoples-corner',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/qc-gov-faqs',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/calendar',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/places-to-visit',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/careers',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
  {
    path: '/about-qc',
    element: (
      <MainLayout>
        <PlaceholderPage />
      </MainLayout>
    ),
  },
]);
