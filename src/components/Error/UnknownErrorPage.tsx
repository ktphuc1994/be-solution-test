// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const UnknownErrorPage = () => {
  return (
    <Box
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
      <ErrorOutlineIcon fontSize='inherit' />
      <Typography mt='0.5rem' fontSize='1.8rem' fontWeight={600} textAlign='center'>
        An error has occurred. Please reload the page or try again later.
      </Typography>
    </Box>
  );
};

export default UnknownErrorPage;
