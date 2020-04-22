import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SnackBarMessage = ({
  open,
  handleClose,
  severity,
  duration,
  text,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};
