import { useLocation } from 'react-router-dom';

// import MUI components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// import MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { InterfaceSidebarContent } from '../../../../types/components/comps-layout';

const itemList = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    pathname: '/'
  },
  {
    name: 'User List',
    icon: <GroupIcon />,
    pathname: '/user-list'
  }
];

const SidebarContent = ({ open, setOpen }: InterfaceSidebarContent) => {
  const location = useLocation();

  return (
    <List>
      {itemList.map((item) => (
        <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            href={item.pathname}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5
            }}
            selected={item.pathname === location.pathname}
            onClick={() => {
              if (setOpen) setOpen(false);
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
