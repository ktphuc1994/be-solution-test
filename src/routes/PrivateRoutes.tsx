import { Navigate, Outlet } from 'react-router-dom';
import localServ from '../services/localServ';

const PrivateRoutes = () => {
  const token = localServ.getToken();
  return token ? <Outlet /> : <Navigate to='login' />;
};

export default PrivateRoutes;
