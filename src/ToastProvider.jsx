import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lastToastSelector } from './redux/selectors/toastSelectors';
import { deleteToastAction } from './redux/actions/toastActions';
import { Alert, Slide, Snackbar } from '@mui/material';

function ToastProvider() {
  const dispatch = useDispatch();
  const toast = useSelector(lastToastSelector);

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    if (toast) {
      dispatch(deleteToastAction(toast));
    }
  }, [dispatch, toast]);

  useEffect(() => {
    if (toast === null && open) {
      setOpen(false);
    }
    if (toast && !open) {
      setOpen(false);
    }
    setOpen(true);
  }, [toast, open, setOpen]);

  if (toast === null) {
    return null;
  }

  // TODO atom toast
  return (
    <Snackbar
      open={open}
      autoHideDuration={toast.autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      TransitionComponent={(props) => <Slide {...props} direction="right" />}
    >
      <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );

}

export default ToastProvider;
