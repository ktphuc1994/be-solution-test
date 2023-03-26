import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// import local components
import Layout from '../components/HOC/Layout/';
import UnknownErrorPage from '../components/Error/UnknownErrorPage';
import NotFoundPage from '../components/NotFound/NotFoundPage';
const LoginPage = lazy(() => import('@pages/login'));
const PrivateRoutes = lazy(() => import('./PrivateRoutes'));
const HomePage = lazy(() => import('@pages/index'));
const UserList = lazy(() => import('@pages/userList'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <UnknownErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        index: true,
        element: <HomePage />
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'user-list',
            element: <UserList />
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

export default router;
