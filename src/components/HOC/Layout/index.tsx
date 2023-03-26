import { Suspense, useState } from 'react';

/* import react router dom packages */
import { Outlet, useLocation } from 'react-router-dom';

// import local components
import InnerSpinner from '@components/Spinner/InnerSpinner';
import ScreenSpinner from '@components/Spinner/ScreenSpinner';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

// import MUI components
import Box from '@mui/material/Box';

const Layout = () => {
  const location = useLocation();
  const [sideOpen, setSideOpen] = useState(false);

  if (location.pathname === '/login') {
    return (
      <Suspense fallback={<ScreenSpinner />}>
        <Outlet />
      </Suspense>
    );
  }

  return (
    <Box component='main' sx={{ display: 'flex' }}>
      <Box sx={{ flexShrink: { md: 0 } }}>
        <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          px: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Header sideOpen={sideOpen} setSideOpen={setSideOpen} />
        <Box sx={{ flexGrow: 1 }}>
          <Suspense fallback={<InnerSpinner size='3rem' thickness={4} />}>
            <Outlet />
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
