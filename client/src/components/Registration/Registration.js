import React, { useState, useEffect } from "react";
import axios from "axios";
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
  handleActiveStepNext,
  handleActiveStepBack,
  handleActiveStepReset
} from "../../store/Registration/actions";

import { useTranslation } from "react-i18next";
import { SERVER_URL } from "../../shared/constants";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";

const Registration = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [registrationInfo, setRegistrationInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [
    isSuccessRegistrationMessage,
    setIsSuccessRegistrationMessage
  ] = useState(false);
  const [isExistEmailMessage, setIsExistEmailMessage] = useState(false);
  const [existEmailErrorMessage, setExistEmailErrorMessage] = useState("");
  // REDUX
  const { RegistrationReducer } = useSelector(state => state);
  const { activeStep } = RegistrationReducer;
  const dispatch = useDispatch();
  // FUNCTIONs
  const handleCloseIsExistEmailMessage = () => setIsExistEmailMessage(false);
  const handleCloseModalMessage = () => setOpenModalMessage(false);
  const handleCloseSnackBarMessage = () =>
    setIsSuccessRegistrationMessage(false);
  const handleNextStep = () => {
    dispatch(handleActiveStepNext());
  };
  const handleBackStep = () => {
    dispatch(handleActiveStepBack());
  };
  const handleResetStep = () => {
    dispatch(handleActiveStepReset());
  };

  const checkExistingEmailAndSendData = latestData => {
    setRegistrationInfo(latestData);
    console.log(1141343141, latestData);
    const { email } = latestData;
    if (latestData) {
      axios
        .post(`${SERVER_URL}/checkExistEmailOfUserInDB`, { email: email })
        .then(res => {
          console.log(res);
          handleNextStep();
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 400) {
            setIsExistEmailMessage(true);
            setExistEmailErrorMessage(err.response.data.message);
          }
        });
    }
  };

  const sendData = latestData => {
    setRegistrationInfo(latestData);
    // console.log(data);
    if (latestData) {
      axios
        .post(`${SERVER_URL}/register`, latestData)
        .then(res => {
          console.log(res);
          console.log(res.status);
          setRegistrationInfo({});
          setIsSuccessRegistrationMessage(true);
          handleNextStep();
        })
        .catch(err => {
          console.log(err.message);
          if (err.message === "Network Error") {
            setErrorMessage(
              err.message + ": You need to launch backend server"
            );
            setOpenModalMessage(true);
          }
        });
    }
  };
  const handleSubmit = (newData, shouldSendData = false) => {
    const latestData = { ...registrationInfo, ...newData };
    console.log(latestData);
    if (shouldSendData) {
      sendData(latestData);
    } else {
      checkExistingEmailAndSendData(latestData);
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
            handleSubmitData={handleSubmit}
            formTitle={t("Personal Details")}
          />
        );
      case 2:
        return (
          <ContactDetails
            handleSubmitData={handleSubmit}
            formTitle={t("Contact Details")}
            handleBackStep={handleBackStep}
            error={{
              errorMessage,
              setErrorMessage,
              setOpenModalMessage,
              openModalMessage,
              handleCloseModalMessage
            }}
          />
        );
      case 3:
        return <Congratulation handleResetStep={handleResetStep} />;
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

      {isSuccessRegistrationMessage && (
        <SnackBarMessage
          duration={3000}
          severity="success"
          open={isSuccessRegistrationMessage}
          handleClose={handleCloseSnackBarMessage}
          text="You are registered!"
        />
      )}
      {isExistEmailMessage && (
        <SnackBarMessage
          duration={null}
          severity="error"
          open={isExistEmailMessage}
          handleClose={handleCloseIsExistEmailMessage}
          text={existEmailErrorMessage}
        />
      )}
    </div>
  );
};

export default Registration;
