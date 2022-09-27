import React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

function FireAlert(props) {

  const [open, setOpen] = React.useState(true);
  
  return (
    <div>
      {props.alert && (
        <Alert variant="filled" severity={props.alert.type} action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          {props.alert.msg}!
        </Alert>

        // <div
        //   className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        //   role="alert"
        // >
        //   {props.alert.msg}
        //   <button
        //     type="button"
        //     className="btn-close"
        //     data-bs-dismiss="alert"
        //     aria-label="Close"
        //   ></button>
        // </div>
      )}
    </div>
  );
}

export default FireAlert;
