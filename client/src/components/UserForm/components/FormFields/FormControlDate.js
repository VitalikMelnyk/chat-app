import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "../../../../../node_modules/date-fns/locale/en-US";
import ruLocale from "../../../../../node_modules/date-fns/locale/ru";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { setPersonalField } from "../../../../store/UserForm/PersonalDetails/actions";
import { useTranslation } from "react-i18next";

const locale = {
  en: enLocale,
  ua: ruLocale
};

export const FormControlDate = () => {
  const { PersonalDetailsReducer, LocaleReducer } = useSelector(state => state);
  const { birthdayDate } = PersonalDetailsReducer;
  const { language } = LocaleReducer;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale[language]}>
      <KeyboardDatePicker
        color="secondary"
        fullWidth
        autoOk
        openTo="year"
        views={["year", "month", "date"]}
        variant="inline"
        inputVariant="standard"
        label={t("Date of birth")}
        format="dd/MM/yyyy"
        invalidDateMessage={t("Invalid Date Format")}
        value={birthdayDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date =>
          dispatch(setPersonalField({ name: "birthdayDate", value: date }))
        }
      />
    </MuiPickersUtilsProvider>
  );
};
