import React, { useState, useEffect } from "react";
import AOS from "aos";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import StepperComponent from "./components/Stepper";
import PersonalDetails from "./components/PersonalDetails";
import ContactDetails from "./components/ContactDetails";
import Introduction from "./components/Introduction";
import Congratulation from "./components/Congratulation";
import {
  resetStep,
  setFormErrors,
  setFormFields,
  handleActiveStepNext,
  handleActiveStepBack,
  addDataToAllInformation,
  handleResetAllForm,
  sendData
} from "../../store/Registration/actions";

import { useTranslation } from "react-i18next";

const Registration = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [registrationInfo, setRegistrationInfo] = useState({});
  const { RegistrationReducer } = useSelector(state => state);
  const { activeStep } = RegistrationReducer;
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(handleActiveStepNext());
  };
  const handleBackStep = () => {
    dispatch(handleActiveStepBack());
  };
  const handleResetForm = () => {
    dispatch(handleResetAllForm());
  };

  const handleSubmit = (newData, shouldSendData = false) => {
    const latestData = { ...registrationInfo, ...newData };
    console.log(latestData);
    if (shouldSendData) {
      setRegistrationInfo(latestData);
    } else {
      setRegistrationInfo(latestData);
    }
  };

  useEffect(() => {
    AOS.init();
  });

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Introduction handleNextStep={handleNextStep} />;
      case 1:
        return (
          <PersonalDetails
            handleNextStep={handleNextStep}
            handleSubmitData={handleSubmit}
            formTitle={t("Personal Details")}
          />
        );
      case 2:
        return (
          <ContactDetails
            handleSubmitData={handleSubmit}
            formTitle={"Contact Details"}
            handleBackStep={handleBackStep}
          />
        );
      case 3:
        return <Congratulation handleResetAllForm={handleResetForm} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid
          data-aos="zoom-in"
          item
          xs={12}
          sm={8}
          md={6}
          lg={5}
          className={classes.signUpContainer}
        >
          <div className={classes.signUpHeader}>
            <Typography
              color="secondary"
              variant="h1"
              className={classes.signUpTitle}
            >
              {t("Sign Up")}
            </Typography>
          </div>
          <div className={classes.signUpMain}>
            <StepperComponent activeStep={activeStep} />
            <div className={classes.signUpFormBox}>{getStepContent()}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;
