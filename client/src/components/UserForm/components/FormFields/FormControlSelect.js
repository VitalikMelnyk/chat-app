import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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

export const FormControlSelect = ({ onChange, errors, idName }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { PersonalDetailsReducer } = useSelector(state => state);
  const { gender } = PersonalDetailsReducer;
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <FormControl
      className={classes.genderLabel}
      error={errors[idName] ? true : false}
      required
      variant="standard"
      fullWidth
    >
      <InputLabel ref={inputLabel} id={idName}>
        {t("Gender")}
      </InputLabel>
      <Select
        color="secondary"
        labelId={idName}
        id={idName}
        value={gender}
        onChange={onChange}
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
      <FormHelperText>{t(errors[idName])}</FormHelperText>
    </FormControl>
  );
};
