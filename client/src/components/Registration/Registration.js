import React, { useEffect } from "react";
import AOS from "aos";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import StepperComponent from "./components/Stepper";
import PersonalDetails from "./components/PersonalDetails";
import ContactDetails from "./components/ContactDetails";
import Introduction from "./components/Introduction";
import Congratulation from "./components/Congratulation";
import { validateSchema } from "../../utils/validate";
import {
  setPersonalErrors,
  resetPersonalStep
} from "../../store/Registration/PersonalDetails/actions";
import {
  setContactErrors,
  resetContactStep
} from "../../store/Registration/ContactDetails/actions";
import {
  handleActiveStepNext,
  handleActiveStepBack,
  addDataToAllInformation,
  handleResetAllForm
} from "../../store/Registration/actions";

import { useTranslation } from "react-i18next";

const Registration = () => {
  const classes = useStyles();
  const {
    RegistrationReducer,
    PersonalDetailsReducer,
    ContactDetailsReducer
  } = useSelector(state => state);
  const { activeStep } = RegistrationReducer;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleNextStep = () => {
    dispatch(handleActiveStepNext());
  };
  const handleBackStep = () => {
    dispatch(handleActiveStepBack());
  };
  const handleResetPersonalStep = () => {
    dispatch(resetPersonalStep());
  };
  const handleResetContactStep = () => {
    dispatch(resetContactStep());
  };

  const handleResetForm = () => {
    dispatch(handleResetAllForm());
  };
  const handleSubmitDataToAllInformation = nameOfReducer => event => {
    event.preventDefault();
    console.log(nameOfReducer);
    const errors = validateSchema(nameOfReducer);
    console.log(errors);
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length) {
      switch (nameOfReducer) {
        case PersonalDetailsReducer:
          dispatch(setPersonalErrors(errors));
          break;
        case ContactDetailsReducer:
          dispatch(setContactErrors(errors));
          break;
        default:
          break;
      }
    } else {
      switch (nameOfReducer) {
        case PersonalDetailsReducer:
          dispatch(addDataToAllInformation(nameOfReducer));
          handleNextStep();
          break;
        case ContactDetailsReducer:
          dispatch(addDataToAllInformation(nameOfReducer));
          handleNextStep();
          break;
        default:
          break;
      }
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
            formTitle={t("Personal Details")}
            handleNextStep={handleNextStep}
            handleResetCurrentStep={handleResetPersonalStep}
            handleSubmitFormData={handleSubmitDataToAllInformation(
              PersonalDetailsReducer
            )}
          />
        );
      case 2:
        return (
          <ContactDetails
            formTitle={"Contact Details"}
            handleBackStep={handleBackStep}
            handleResetCurrentStep={handleResetContactStep}
            handleSubmit={handleSubmitDataToAllInformation(
              ContactDetailsReducer
            )}
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
