import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  Button,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

export const ModalMessage = ({ handleClose, errorMessage, show }) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("Error Message")}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
