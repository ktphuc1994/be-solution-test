import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

// import local library
import { toast } from 'react-toastify';

// import local services
import userServ from '@services/userServ';
import localServ from '@services/localServ';

// import types and interfaces
import { InterfaceNotLoginComponent } from '~@types/components/comps-login';

// import constants
import { validateRegEx } from '@constants/default.const';

// import local components
import StyledTextField from '../Styled/StyledTextField';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import LockPerson from '@mui/icons-material/LockPerson';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const NotLogin = ({ setLoading }: InterfaceNotLoginComponent) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // FORM control
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const [emailInputErr, setEmailInputErr] = useState(false);
  const [passInputErr, setPassInputErr] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // DEBOUNCE ref
  const dbEmailRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const dbPassRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // FORM Event handling
  const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(dbEmailRef.current);
    dbEmailRef.current = setTimeout(() => {
      const isValid = validateRegEx.email.regex.test(e.target.value);
      // console.log({ isValid });
      if (!isValid) {
        setEmailInputErr(true);
        return;
      }
      setEmailInputErr(false);
    }, 300);
  };
  const handleInputPass = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(dbPassRef.current);
    dbPassRef.current = setTimeout(() => {
      const value = e.target.value;
      // console.log(value);
      const isValid = validateRegEx.password.regex.test(value);
      if (!isValid) {
        setPassInputErr(true);
        return;
      }
      setPassInputErr(false);
    }, 300);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // API Event handling
  const handleLogin = async () => {
    // validation handling
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    if (!email || !password) return;

    const isEmailValid = validateRegEx.email.regex.test(email);
    const isPassValid = validateRegEx.password.regex.test(password);
    if (!isEmailValid || !isPassValid) {
      !isEmailValid && setEmailInputErr(true);
      !isPassValid && setPassInputErr(true);
      return;
    }

    // login API
    setLoading(true);
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
      <Typography component='h1' variant='h4' fontWeight={700}>
        Login In
      </Typography>
      <Box component='form' sx={{ maxWidth: '500px' }}>
        <StyledTextField
          margin='normal'
          fullWidth
          autoFocus
          id='email'
          label='Email Address'
          name='email'
          type='email'
          autoComplete='email'
          inputRef={emailRef}
          error={emailInputErr}
          helperText={emailInputErr ? validateRegEx.email.message : null}
          onChange={handleInputEmail}
          sx={{ mb: '1rem' }}
        />
        <StyledTextField
          margin='normal'
          required
          fullWidth
          id='password-input'
          label='Password'
          name='password'
          type={showPassword ? 'text' : 'password'}
          autoComplete='current-password'
          inputRef={passRef}
          error={passInputErr}
          helperText={passInputErr ? validateRegEx.password.message : null}
          onChange={handleInputPass}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button fullWidth variant='contained' sx={{ mt: '1.5rem' }} onClick={handleLogin}>
          Log In
        </Button>
      </Box>
    </>
  );
};

export default NotLogin;
