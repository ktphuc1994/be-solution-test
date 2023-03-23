import { createBrowserRouter } from 'react-router-dom';

// import local components
import PrivateRoutes from './PrivateRoutes';
import Layout from '../components/HOC/Layout/';
import LoginPage from '@pages/login';
import HomePage from '@pages/index';
import UserList from '@pages/userList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
      }
    ]
  }
]);

export default router;
