// import types and interfaces
import { InterfaceComfirmModalComponent } from '~@types/components';

// import MUI components
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';

const ConfirmModal = ({
  open,
  handleClose,
  handleConfirm,
  title = 'Delete Confirmation',
  confirmContent
}: InterfaceComfirmModalComponent) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOK = async () => {
    setConfirmLoading(true);
    await handleConfirm();
    setConfirmLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
    >
      <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirm-dialog-description' sx={{ fontSize: '1.1rem' }}>
          {confirmContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' color='error'>
          Cancel
        </Button>
        <Button disabled={confirmLoading} onClick={handleOK} variant='contained' color='error'>
          {confirmLoading ? 'Loading...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
