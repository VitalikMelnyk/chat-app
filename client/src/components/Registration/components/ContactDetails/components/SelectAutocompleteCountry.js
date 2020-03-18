import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { countriesList } from "../../../../../shared/functions";
import { setContactField } from "../../../../../store/Registration/ContactDetails/actions";
import { useTranslation } from "react-i18next";
export const SelectAutocompleteCountry = ({ errors, idName }) => {
  const { t } = useTranslation();
  const { ContactDetailsReducer } = useSelector(state => state);
  const { country } = ContactDetailsReducer;
  const dispatch = useDispatch();
  console.log("country: ", country);
  const handleChangeField = name => (event, value) => {
    const payload = { value, name };
    console.log(payload);
    dispatch(setContactField(payload));
  };

  return (
    <Autocomplete
      //   freeSolo
      color="secondary"
      id="selectCountry"
      autoComplete={true}
      style={{ width: 300 }}
      options={countriesList}
      autoHighlight
      value={country}
      onChange={handleChangeField("country")}
      getOptionLabel={option => option.label}
      renderOption={option => (
        <>
          {option.label} ({option.code})
        </>
      )}
      renderInput={params => (
        <TextField
          color="secondary"
          error={errors[idName] ? true : false}
          helperText={t(errors[idName])}
          fullWidth
          required
          id={idName}
          {...params}
          label={t("Choose a country")}
          variant="standard"
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
  );
};
