import React from "react";
import { TextField } from "@material-ui/core";

export const FormControlText = ({
  autoFocus = false,
  maxLength = 150,
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
  return (
    <TextField
      inputProps={{ maxLength: maxLength }}
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
