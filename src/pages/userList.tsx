import { useState } from 'react';

// import types and interfaces
import { InterfaceFilterUser } from '../types/models/user';

// import local constants
import { ageRange, defaultFilterUser } from '../constants/default.const';

// import local components
import SearchBar from '../components/UserList/SearchBar';
import Table from '../components/UserList/Table';

// import MUI components
import Box from '@mui/material/Box';

const UserList = () => {
  const [filterUser, setFilterUser] = useState<InterfaceFilterUser>(defaultFilterUser);

  const idReg = filterUser.id ? new RegExp(filterUser.id, 'i') : /[\s\S]*/;
  const fullNameReg = filterUser.fullName ? new RegExp(filterUser.fullName, 'i') : /[\s\S]*/;
  const ageLimit = filterUser.age ? ageRange[filterUser.age] : undefined;
  const filterValue = { idReg, fullNameReg, ageLimit };

  return (
    <Box component='div' sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <SearchBar setFilterUser={setFilterUser} />
      <Table filterValue={filterValue} />
    </Box>
  );
};

export default UserList;
