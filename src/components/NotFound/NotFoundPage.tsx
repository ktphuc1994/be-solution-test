// import local constants
import colorConst from '@constants/color.const';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NotFoundPage = () => {
  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem'
      }}
    >
      <img
        src='https://genshin.hoyoverse.com/_nuxt/img/75b7032.png'
        alt='Page not found'
        style={{ maxWidth: '60%', objectFit: 'contain' }}
      />
      <Typography
        my='1rem'
        fontSize={{ xs: '1.5rem', sm: '2rem' }}
        fontWeight={600}
        color={colorConst.yellowNotFound}
        textAlign='center'
      >
        This page cannot be found
      </Typography>
      <Button href='/' variant='contained' color='error'>
        Back to HOME »
      </Button>
    </Box>
  );
};

export default NotFoundPage;
