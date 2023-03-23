import { useState } from 'react';

/* import react router dom packages */
import { Outlet, useLocation } from 'react-router-dom';

// import local components
// import InnerSpinner from '../../Spinner/InnerSpinner';

// import MUI components
import Box from '@mui/material/Box';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const [sideOpen, setSideOpen] = useState(false);

  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <Box component='main' sx={{ display: 'flex' }}>
      <Box component='div' sx={{ flexShrink: { md: 0 } }}>
        <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      </Box>
      <Box
        component='div'
        sx={{
          flexGrow: 1,
          px: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
        <Box component='div' sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
