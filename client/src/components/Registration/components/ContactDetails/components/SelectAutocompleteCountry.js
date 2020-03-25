import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { countriesList } from "../../../../../shared/functions";

export const SelectAutocompleteCountry = ({
  id,
  name,
  label,
  value,
  onBlur,
  helperText,
  error,
  setFieldValue
}) => {
  return (
    <Autocomplete
      color="secondary"
      id="selectCountry"
      name={name}
      helperText={helperText}
      error={error}
      autoComplete
      style={{ width: "100%", marginRight: "20px" }}
      options={countriesList}
      autoHighlight
      value={value}
      onBlur={onBlur}
      onChange={(e, value) => {
        setFieldValue("country", value);
      }}
      getOptionLabel={option => option.label}
      renderOption={option => (
        <>
          {option.label} ({option.code})
        </>
      )}
      renderInput={params => (
        <TextField
          color="secondary"
          id={id}
          name={name}
          fullWidth
          required
          {...params}
          label={label}
          variant="standard"
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
  );
};
