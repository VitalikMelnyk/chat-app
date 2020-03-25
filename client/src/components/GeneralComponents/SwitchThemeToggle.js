import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

const FormControlSwitch = ({
  checkedSwitch,
  toggleTheme,
  label,
  className
}) => {
  return (
    <FormControlLabel
      control={
        <Switch
          color="primary"
          checked={checkedSwitch}
          onChange={toggleTheme}
        />
      }
      label={label}
      className={className}
    />
  );
};

export default FormControlSwitch;
