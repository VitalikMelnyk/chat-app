import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { useTranslation } from "react-i18next";

const locale = {
  en: enLocale,
  ua: ruLocale
};

export const FormControlDate = ({ field, form, ...other }) => {
  const { LocaleReducer } = useSelector(state => state);
  const { language } = LocaleReducer;
  const { t } = useTranslation();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale[language]}>
      <KeyboardDatePicker
        color="secondary"
        fullWidth
        autoOk
        name={field.name}
        openTo="year"
        views={["year", "month", "date"]}
        variant="inline"
        inputVariant="standard"
        label={t("Date of birth")}
        format="dd/MM/yyyy"
        placeholder="10/10/2018"
        invalidDateMessage={t("Invalid Date Format")}
        value={field.value}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => form.setFieldValue(field.name, date)}
      />
    </MuiPickersUtilsProvider>
  );
};
