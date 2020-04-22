import React from "react";
import { useSelector } from "react-redux";
import { Typography, makeStyles } from "@material-ui/core";
import { getSteps } from "../../shared/functions";

const useStyles = makeStyles({
  formTitle: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "25px",
  },
});

export const FormTitle = ({ formTitle }) => {
  const steps = getSteps();
  const classes = useStyles();
  const { RegistrationReducer } = useSelector((state) => state);
  const { activeStep } = RegistrationReducer;
  return (
    <div className={classes.formTitle}>
      <Typography variant="h5" color="secondary" component="h2">
        {formTitle}
      </Typography>
      <Typography variant="h5" component="p" color="textPrimary">
        {activeStep + 1} / {steps.length}
      </Typography>
    </div>
  );
};
