import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SnackBarMessage = ({ open, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        You are registered!
      </Alert>
    </Snackbar>
  );
};
