import { memo } from 'react';

// import type and interface
import { InterfaceHeader } from '~@types/components/comps-layout';

// import local components
import UserNav from './UserNav';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

const Header = memo(({ sideOpen, setSideOpen }: InterfaceHeader) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        my: '0.5rem',
        mx: { xs: '-1rem', md: 0 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {sideOpen ? null : (
          <IconButton
            onClick={() => {
              setSideOpen(true);
            }}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              mr: '0.5rem'
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link
          href='/'
          sx={{
            textDecoration: 'none',
            color: 'black',
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
            fontWeight: 700
          }}
        >
          BE
          <Typography
            component='span'
            sx={{
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'primary.main'
            }}
          >
            SOLUTION
          </Typography>{' '}
          TEST
        </Link>
      </Box>
      <Box>
        <UserNav />
      </Box>
    </Box>
  );
});

export default Header;
