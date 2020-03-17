import React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText
} from "@material-ui/core";
import { radioItems } from "../../../../shared/functions";
import { useStyles } from "../../styles";
import { useTranslation } from "react-i18next";

export const FormControlRadio = ({ value, onChange, idName, errors }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <FormControl
      fullWidth
      component="fieldset"
      color="secondary"
      error={errors[idName] ? true : false}
      className={classes.formControl}
    >
      <FormLabel component="legend">{t("Payment Type")}</FormLabel>
      <RadioGroup
        aria-label="paymentType"
        name="paymentType"
        value={value}
        onChange={onChange}
      >
        {radioItems.map(item => (
          <FormControlLabel
            value={item.value}
            key={item.value}
            label={t(item.label)}
            className={classes.paymentType}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
      <FormHelperText className="text-center">
        {t(errors[idName])}
      </FormHelperText>
    </FormControl>
  );
};
