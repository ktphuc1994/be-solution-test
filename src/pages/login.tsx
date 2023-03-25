import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// import local service
import userServ from '@services/userServ';

// import local components
import NotLogin from '@components/Login/NotLogin';
import AlreadyLogin from '@components/Login/AlreadyLogin';
import ScreenSpinner from '@components/Spinner/ScreenSpinner';
import InnerSpinner from '@components/Spinner/InnerSpinner';

// import MUI Components
import Box from '@mui/material/Box';

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, isLoading } = useQuery({ queryKey: ['user'], queryFn: userServ.getUserInfo });

  return (
    <Box
      component='main'
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'url(https://images7.alphacoders.com/370/370162.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {isLoading ? <ScreenSpinner bg='rgba(0, 0, 0, 0.4)' /> : null}
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(7px)',
          borderRadius: '12px',
          margin: '0.5rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          component='div'
          sx={{
            display: `${loading ? 'block' : 'none'}`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '12px',
            zIndex: 10
          }}
        >
          <InnerSpinner size='3rem' />
        </Box>
        {user ? <AlreadyLogin /> : <NotLogin setLoading={setLoading} />}
      </Box>
    </Box>
  );
};

export default LoginPage;
