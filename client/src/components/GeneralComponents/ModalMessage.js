import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Button,
  DialogContent,
  DialogActions
} from "@material-ui/core";

export const ModalMessage = ({ handleClose, errorMessage, show }) => {
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Error Message"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
