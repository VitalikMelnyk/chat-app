import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@material-ui/core";

const ProfileDialog = ({ open, handleClose, currentUserInfo }) => {
  const {
    firstName,
    secondName,
    gender,
    email,
    telephoneNumber,
    city,
    address
  } = currentUserInfo;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-dialog-title"
      aria-describedby="profile-dialog-description"
    >
      <DialogTitle id="profile-dialog-title">
        {firstName} {secondName}
      </DialogTitle>
      <DialogContent id="profile-dialog-description">
        <Typography>Email: {email}</Typography>
        <Typography>Telephone: {telephoneNumber}</Typography>
        <Typography>Gender: {gender}</Typography>
        <Typography>City: {city}</Typography>
        <Typography>Address: {address}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
