import React from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { ColorlibStepIcon } from "./ColorlibStepIcon";
import { useStyles, ColorlibConnector } from "./styles";
import { useTranslation } from "react-i18next";
import { getSteps } from "../../../../shared/functions";

const StepperComponent = ({ activeStep }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const steps = getSteps();
  return (
    <Stepper
      className={classes.stepper}
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map(label => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{t(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
