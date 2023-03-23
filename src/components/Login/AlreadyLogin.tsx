// import MUI components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const AlreadyLogin = () => {
  return (
    <>
      <LockOpenIcon fontSize='large' sx={{ mb: '0.5rem' }} />
      <Typography component='h1' variant='h5' mb='0.5rem'>
        You have already login. Let's get back to Home.
      </Typography>
      <Button fullWidth href='/' variant='contained' color='error'>
        Homepage
      </Button>
    </>
  );
};

export default AlreadyLogin;
