import { memo, forwardRef, FormEvent, useRef, ReactElement, Ref, useState } from 'react';

// import local types and interfaces
import moment, { Moment } from 'moment';
import { InterfaceUserFormComponents } from '~@types/components/comps-userList';

// import MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import { TransitionProps } from '@mui/material/transitions';
import { DatePicker } from '@mui/x-date-pickers';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const now = moment();

const UserForm = memo(({ open, setOpen, userInfo }: InterfaceUserFormComponents) => {
  const defaultDate = moment(now);
  const [birthday, setBirthday] = useState<Moment | null>(null);
  const [bdInputErr, setBdInputErr] = useState(false);
  const fullNameRef = useRef<HTMLInputElement | null>(null);

  const isUpdate = Boolean(userInfo.id);
  const titleText = isUpdate ? 'Update' : 'Create';
  const age = birthday?.isValid()
    ? defaultDate.diff(birthday, 'years')
    : userInfo.age
    ? userInfo.age
    : null;

  const handleClose = () => {
    setBirthday(null);
    setBdInputErr(false);
    setOpen(false);
  };

  const handleDatePick = (newDate: Moment | null) => {
    if (newDate?.isValid()) {
      bdInputErr && setBdInputErr(false);
    } else {
      setBdInputErr(true);
    }
    setBirthday(newDate);
  };

  // handle create and update user
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bdInputErr || !birthday?.isValid()) {
      setBdInputErr(true);
      return;
    }
    console.log('Is Birthday Valid: ', birthday?.isValid());
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby='user-form-create-update'
    >
      <DialogTitle>{titleText} User</DialogTitle>
      <Divider />
      <DialogContent>
        <Box component='form' id='user-form' onSubmit={handleSubmit}>
          {isUpdate ? (
            <Typography fontSize='1.1rem'>
              ID: <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{userInfo.id}</span>
            </Typography>
          ) : null}
          <TextField
            margin='normal'
            required
            fullWidth
            id='form-fullName'
            label='Full Name'
            name='fullName'
            defaultValue={userInfo.fullName}
            inputRef={fullNameRef}
            sx={{ mb: '1rem' }}
          />
          <DatePicker
            label='Birthday'
            format='DD/MM/YYYY'
            defaultValue={userInfo.age ? defaultDate.subtract(userInfo.age, 'years') : undefined}
            onChange={handleDatePick}
            slotProps={{
              textField: {
                fullWidth: true,
                name: 'birthday',
                error: bdInputErr,
                helperText: bdInputErr ? 'Please select a valid date' : null
              }
            }}
          />
        </Box>
        <Typography component='p' sx={{ mt: 1, ml: 0.5, fontSize: '0.8rem' }}>
          {age ? `Age: ${age}` : null}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: '1.5rem', py: '1rem' }}>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button variant='contained' form='user-form' type='submit'>
          {titleText}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UserForm;
