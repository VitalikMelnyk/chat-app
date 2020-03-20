import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { genderOptions } from "../../../../shared/functions";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

export const FormControlSelect = ({
  onChange,
  idName,
  value,
  onBlur,
  error,
  helperText
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <FormControl
      className={classes.genderLabel}
      error={error}
      required
      variant="standard"
      fullWidth
     
    >
      <InputLabel ref={inputLabel} id={idName}>
        {t("Gender")}
      </InputLabel>
      <Select
        color="secondary"
        name="gender"
        labelId={idName}
        id="gender"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        labelWidth={labelWidth}
      >
        <MenuItem value="" disabled>
          {t("Select your gender")}
        </MenuItem>
        {genderOptions.map(item => (
          <MenuItem value={item.value} key={item.value}>
            {t(item.label)}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
