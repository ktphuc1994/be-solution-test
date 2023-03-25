import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// import local services
import userServ from '../services/userServ';

// import local components
import InnerSpinner from '../components/Spinner/InnerSpinner';
import UnknownErrorPage from '../components/Error/UnknownErrorPage';

const PrivateRoutes = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: userServ.getUserInfo
  });
  if (isLoading) return <InnerSpinner size='3rem' thickness={4} />;

  if (isError && error === 'Unauthorized. Please login to continue') return <Navigate to='login' />;

  return data ? <Outlet /> : <UnknownErrorPage />;
};

export default PrivateRoutes;
