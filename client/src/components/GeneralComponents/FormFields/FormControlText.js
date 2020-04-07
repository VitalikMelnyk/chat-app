import React from "react";
import { TextField } from "@material-ui/core";
import { useStyles } from "./styles";

export const FormControlText = ({
  autoFocus = false,
  maxLength = 50,
  id,
  name,
  label,
  type,
  onBlur,
  helperText,
  error,
  value,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <TextField
      inputProps={{ maxLength: maxLength }}
      // classes={{
      //   root: classes.credentialFieldItem
      // }}
      autoFocus={autoFocus}
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
