import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import { languageOptions } from "../../../../shared/functions";
import { useStyles } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { setLanguageApp } from "../../../../store/Locale/actions";
import { useTranslation } from "react-i18next";

export const SelectLanguage = ({ name }) => {
  const classes = useStyles();
  const { LocaleReducer } = useSelector(state => state);
  const { language } = LocaleReducer;
  console.log(language);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = name => event => {
    const value = event.target.value;
    const payload = { value, name };
    console.log(payload);
    dispatch(setLanguageApp(payload));
    i18n.changeLanguage(value);
  };

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Select Language</FormLabel> */}
      <RadioGroup
        row
        aria-label={name}
        name={name}
        value={language}
        onChange={handleChangeLanguage(name)}
      >
        {languageOptions.map(language => (
          <FormControlLabel
            value={language.value}
            key={language.value}
            label={language.label}
            className={classes.selectLanguage}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
