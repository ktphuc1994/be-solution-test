import { memo, forwardRef, FormEvent, useRef, ReactElement, Ref, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// import local library
import { toast } from 'react-toastify';

// imoprt local services
import userServ from '@services/userServ';

// import local types and interfaces
import moment, { Moment } from 'moment';
import { InterfaceUserFormComponents } from '~@types/components/comps-userList';
import { InterfaceUser, InterfaceUserInfo } from '~@types/models/user';

// import local utils
import { axiosErrorHandling } from '../../utils';

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

const UserForm = memo(({ open, setOpen, userInfo }: InterfaceUserFormComponents) => {
  const queryClient = useQueryClient();
  const [birthday, setBirthday] = useState<Moment | null>(null);
  const [bdInputErr, setBdInputErr] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const fullNameRef = useRef<HTMLInputElement | null>(null);

  const isUpdate = Boolean(userInfo.id);
  const titleText = isUpdate ? 'Update' : 'Create';
  const age = bdInputErr
    ? null
    : birthday?.isValid()
    ? moment().diff(birthday, 'years')
    : userInfo.age
    ? userInfo.age
    : null;

  // FORM Control
  const handleClose = () => {
    setBirthday(null);
    setBdInputErr(false);
    setOpen(false);
  };

  const handleDatePick = (newDate: Moment | null) => {
    if (newDate?.isValid()) {
      setBdInputErr(false);
      setBirthday(newDate);
    } else {
      setBdInputErr(true);
    }
  };

  // Handle create and update user
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (age === null) {
      setBdInputErr(true);
      return;
    }
    if (!fullNameRef.current) return;

    setButtonLoading(true);
    const method = isUpdate ? 'updateUser' : 'createUser';
    const userData = {
      fullName: fullNameRef.current.value,
      age,
      birthday: birthday ? birthday.format('YYYY-MM-DD') : userInfo.birthday
    } as InterfaceUserInfo & InterfaceUser;
    if (isUpdate) {
      userData.id = userInfo.id;
    }

    try {
      await userServ[method](userData);
      toast.success(`${titleText}d user successfully!`);
      queryClient.invalidateQueries(['user-list']);
      handleClose();
    } catch (err) {
      axiosErrorHandling(err);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return;
        handleClose();
      }}
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
            defaultValue={userInfo.birthday ? moment(userInfo.birthday) : undefined}
            onChange={handleDatePick}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                name: 'birthday',
                error: bdInputErr,
                helperText: bdInputErr ? 'Please select a valid date' : null
              },
              popper: { placement: 'auto' }
            }}
          />
        </Box>
        <Typography component='p' sx={{ mt: 1, ml: 0.5, fontSize: '0.9rem' }}>
          {age !== null ? `Age: ${age}` : null}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: '1.5rem', py: '1rem' }}>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button
          disabled={buttonLoading ? true : false}
          variant='contained'
          form='user-form'
          type='submit'
        >
          {buttonLoading ? 'Loading...' : titleText}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UserForm;
