import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

// import local services
import userServ from '@services/userServ';
import localServ from '@services/localServ';

// import local library
import { toast } from 'react-toastify';

// import types and interfaces
import { InterfaceNotLoginComponent } from '~@types/components/comps-login';

// import local components
import StyledTextField, { inputStyle } from '../Styled/StyledTextField';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LockPerson from '@mui/icons-material/LockPerson';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const NotLogin = ({ setLoading }: InterfaceNotLoginComponent) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSummit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const token = await userServ.login({ email, password });
      localServ.setToken(token);
      toast.success('Login successfully!!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    } catch (err) {
      if (typeof err === 'string') {
        toast.error(err);
        return;
      }
      toast.error('Unknow Error. Please try again later.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LockPerson fontSize='large' sx={{ mb: '0.5rem' }} />
      <Typography component='h1' variant='h4'>
        Login In
      </Typography>
      <Box component='form' onSubmit={handleSummit}>
        <StyledTextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          type='email'
          defaultValue=''
          autoComplete='email'
          autoFocus
          sx={{ mb: '1rem' }}
        />
        <FormControl sx={{ ...inputStyle, width: '100%' }} variant='outlined' required>
          <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
            name='password'
            defaultValue=''
            autoComplete='password'
          />
        </FormControl>
        <Button type='submit' fullWidth variant='contained' sx={{ mt: '1.5rem' }}>
          Log In
        </Button>
      </Box>
    </>
  );
};

export default NotLogin;
