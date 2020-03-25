import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { languageOptions } from "../../shared/functions";
import { useStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { setLanguageApp } from "../../store/Locale/actions";
import { useTranslation } from "react-i18next";

export const SelectLanguage = ({ name }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { LocaleReducer } = useSelector(state => state);
  const { language } = LocaleReducer;
  console.log(language);
  const dispatch = useDispatch();

  const handleChangeLanguage = name => event => {
    const value = event.target.value;
    const payload = { value, name };
    dispatch(setLanguageApp(payload));
    i18n.changeLanguage(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        color="secondary"
        value={language}
        onChange={handleChangeLanguage(name)}
      >
        <MenuItem value="" disabled>
          <em>Select language</em>
        </MenuItem>
        {languageOptions.map(language => (
          <MenuItem color="hint" value={language.value} key={language.value}>
            {t(language.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
