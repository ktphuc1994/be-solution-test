import { memo, MouseEvent, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// import local library
import { toast } from 'react-toastify';

// import local service
import localServ from '@services/localServ';
import userServ from '@services/userServ';

// import MUI components
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

const UserNav = memo(() => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: userServ.getUserInfo });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localServ.removeToken();
    queryClient.resetQueries(['user']);
    setAnchorEl(null);
    toast('Đăng xuất thành công', {
      type: 'info',
      toastId: 'layout-logout'
    });
  };

  return (
    <Box component='div'>
      {!user ? (
        <Button variant='contained' color='error' href='/login'>
          Login
        </Button>
      ) : (
        <Button
          id='account-menu-button'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {user.email}
        </Button>
      )}
      <Menu
        id='account-menu'
        aria-labelledby='account-menu-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            }
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
});

export default UserNav;
