import { memo, useRef, useState } from 'react';

// import types and interfaces
import { InterfaceSearchBarComponent } from '~@types/components/comps-userList';

// import local constants
import { defaultFilterUser } from '@constants/default.const';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SearchBar = memo(({ setFilterUser, setPage }: InterfaceSearchBarComponent) => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const [ageState, setAgeState] = useState<string>('');

  const handleResetFullName = () => {
    if (fullNameRef.current) {
      fullNameRef.current.value = '';
    }
  };
  const handleChangeAge = (e: SelectChangeEvent) => {
    setAgeState(e.target.value);
    setFilterUser((state) => ({ ...state, age: e.target.value }));
  };

  const handleFilter = () => {
    setFilterUser({
      id: idRef.current!.value,
      fullName: fullNameRef.current!.value,
      age: ageState
    });
    setPage(0);
  };
  const handleReset = () => {
    idRef.current!.value = '';
    fullNameRef.current!.value = '';
    setAgeState('');
    setFilterUser(defaultFilterUser);
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        mb: '1.5rem',
        flexShrink: 0
      }}
    >
      <TextField
        size='small'
        margin='none'
        id='userid'
        label='ID'
        name='userid'
        type='number'
        defaultValue=''
        inputRef={idRef}
      />
      <TextField
        sx={{ mx: { md: 1 }, my: 1 }}
        size='small'
        margin='none'
        id='fullName'
        label='Full Name'
        name='fullName'
        type='text'
        defaultValue=''
        inputRef={fullNameRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='fullName-reset' onClick={handleResetFullName} edge='end'>
                <ClearIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <FormControl size='small' sx={{ minWidth: 120 }}>
        <InputLabel id='age-label'>Age</InputLabel>
        <Select
          labelId='age-label'
          id='age'
          label='Age'
          value={ageState}
          onChange={handleChangeAge}
        >
          <MenuItem value=''>All</MenuItem>
          <MenuItem value='range1'>0 - 10</MenuItem>
          <MenuItem value='range2'>11 - 20</MenuItem>
          <MenuItem value='range3'>21 - 40</MenuItem>
          <MenuItem value='range4'>41 - 60</MenuItem>
          <MenuItem value='range5'>61 - 80</MenuItem>
          <MenuItem value='range6'>81 - 100</MenuItem>
          <MenuItem value='range7'>Above 100</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
        <Button
          variant='contained'
          onClick={handleFilter}
          sx={{ ml: { ml: 1 }, mr: 1, width: '50%' }}
        >
          Filter
        </Button>
        <Button variant='outlined' onClick={handleReset} sx={{ width: '50%' }}>
          Reset
        </Button>
      </Box>
    </Box>
  );
});

export default SearchBar;
