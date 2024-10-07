import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { alertContext } from '../context/alert/alert';
import React from 'react';

const AlertDisplay = () => {
  const { alert, setAlert } = React.useContext(alertContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(null);
  };

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {alert && (
        <Alert
          severity={alert.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alert.msg}
        </Alert>
      )}
    </Snackbar>
  );
};

export default AlertDisplay;