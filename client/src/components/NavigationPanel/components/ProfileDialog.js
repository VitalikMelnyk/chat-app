import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
} from "@material-ui/core";

const ProfileDialog = ({ open, handleClose, currentUserInfo }) => {
  const { t } = useTranslation();
  const {
    firstName,
    secondName,
    gender,
    email,
    telephoneNumber,
    city,
    address,
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
      <Divider />
      <DialogContent id="profile-dialog-description">
        <Typography>
          {t("Email")}: {email}
        </Typography>
        <Typography>
          {t("Telephone")}: {telephoneNumber}
        </Typography>
        <Typography>
          {t("Gender")}: {gender}
        </Typography>
        <Typography>
          {t("City")}: {city}
        </Typography>
        <Typography>
          {t("Address")}: {address}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
