import React from "react";
import { TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

export const FormControlText = ({
  id,
  name,
  fullWidth = true,
  label,
  type,
  onBlur,
  helperText,
  error,
  value,
  onChange
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <TextField
      classes={{
        root: classes.credentialFieldItem
      }}
      fullWidth
      required
      color="secondary"
      type={type}
      variant="standard"
      name={name}
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
    />
  );
};
