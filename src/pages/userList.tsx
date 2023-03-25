import { useMemo, useRef, useState } from 'react';

// import types and interfaces
import { InterfaceFilterUser, InterfaceUser } from '../types/models/user';

// import local constants
import { ageRange, defaultFilterUser, defaultUser } from '../constants/default.const';

// import local components
import SearchBar from '../components/UserList/SearchBar';
import Table from '../components/UserList/Table';
import UserForm from '../components/UserList/Form';

// import MUI components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UserList = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [filterUser, setFilterUser] = useState<InterfaceFilterUser>(defaultFilterUser);
  const selectedUserRef = useRef<InterfaceUser>(defaultUser);

  const filterValue = useMemo(() => {
    const idReg = filterUser.id ? new RegExp(filterUser.id, 'i') : /[\s\S]*/;
    const fullNameReg = filterUser.fullName ? new RegExp(filterUser.fullName, 'i') : /[\s\S]*/;
    const ageLimit = filterUser.age ? ageRange[filterUser.age] : undefined;
    return { idReg, fullNameReg, ageLimit };
  }, [filterUser]);

  const handleCreateClick = () => {
    selectedUserRef.current = defaultUser;
    setFormOpen(true);
  };

  return (
    <Box component='div' sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        component='div'
        sx={{ px: '1rem', mb: 1, display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography component='h2' sx={{ fontSize: '1.8rem', fontWeight: 700 }}>
          User List
        </Typography>
        <Button variant='contained' onClick={handleCreateClick}>
          Create User
        </Button>
      </Box>
      <SearchBar setFilterUser={setFilterUser} />
      <Table
        filterValue={filterValue}
        selectedUserRef={selectedUserRef}
        setFormOpen={setFormOpen}
      />
      <UserForm open={formOpen} setOpen={setFormOpen} userInfo={selectedUserRef.current} />
    </Box>
  );
};

export default UserList;
