import { useLocation, useNavigate } from 'react-router-dom';

// import MUI components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// import MUI Icons
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import GroupIcon from '@mui/icons-material/Group';

const itemList = [
  {
    name: 'Home',
    icon: <DashboardCustomizeIcon />,
    pathname: '/'
  },
  {
    name: 'User List',
    icon: <GroupIcon />,
    pathname: '/user-list'
  }
];

const SidebarContent = ({ open }: { open: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List>
      {itemList.map((item) => (
        <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            selected={item.pathname === location.pathname}
            onClick={() => {
              navigate(item.pathname);
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarContent;
