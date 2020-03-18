import React from "react";
import { TextField } from "@material-ui/core";
import { useStyles } from "../../styles";
import { useTranslation } from "react-i18next";

export const FormControlText = ({
  maxLength = 25,
  idName,
  labelName,
  fullWidth,
  type,
  value,
  onChange,
  errors
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <TextField
      inputProps={{ maxLength: maxLength }}
      classes={{
        root: classes.credentialFieldItem
      }}
      error={errors[idName] ? true : false}
      fullWidth={fullWidth}
      required
      color="secondary"
      type={type}
      id={idName}
      label={labelName}
      variant="standard"
      value={value}
      onChange={onChange}
      helperText={t(errors[idName])}
    />
  );
};
