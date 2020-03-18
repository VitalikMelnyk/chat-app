import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import StepperComponent from "./components/Stepper";
import PersonalDetails from "./components/PersonalDetails";
import ContactDetails from "./components/ContactDetails";
import PaymentDetails from "./components/PaymentDetails";
import Introduction from "./components/Introduction";
import Congratulation from "./components/Congratulation";
import FormControlSwitch from "./components/FormFields/FormControlSwitch";
import { SelectLanguage } from "./components/GeneralComponents/SelectLanguage";
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
  setPaymentErrors,
  resetPaymentStep
} from "../../store/Registration/PaymentDetails/actions";
import {
  handleActiveStepNext,
  handleActiveStepBack,
  addDataToAllInformation,
  handleResetAllForm
} from "../../store/Registration/actions";
import { setThemeType } from "../../store/Theme/actions";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const classes = useStyles();
  const {
    RegistrationReducer,
    ThemeReducer,
    PersonalDetailsReducer,
    ContactDetailsReducer,
    PaymentDetailsReducer
  } = useSelector(state => state);
  const { activeStep } = RegistrationReducer;
  const { themeType, checkedSwitch } = ThemeReducer;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const toggleTheme = () => {
    const newThemeType = themeType === "light" ? "dark" : "light";
    dispatch(setThemeType({ newThemeType, checkedSwitch }));
  };
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
  const handleResetPaymentStep = () => {
    dispatch(resetPaymentStep());
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
        case PaymentDetailsReducer:
          dispatch(setPaymentErrors(errors));
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
        case PaymentDetailsReducer:
          dispatch(addDataToAllInformation(nameOfReducer));
          handleNextStep();
          // alert(JSON.stringify(UserFormReducer, null, 4));
          break;
        default:
          break;
      }
    }
  };

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
            formTitle={
              ("Contact Details")}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
            handleResetCurrentStep={handleResetContactStep}
            handleSubmitFormData={handleSubmitDataToAllInformation(
              ContactDetailsReducer
            )}
          />
        );
      // case 2:
      //   return (
      //     <PaymentDetails
      //       formTitle={t("Payment Details")}
      //       handleBackStep={handleBackStep}
      //       handleResetCurrentStep={handleResetPaymentStep}
      //       handleSubmit={handleSubmitDataToAllInformation(
      //         PaymentDetailsReducer
      //       )}
      //     />
      //   );
      case 3:
        return <Congratulation handleResetAllForm={handleResetForm} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} md={5} className={classes.signUpContainer}>
          <div className={classes.signUpHeader}>
            <Typography
              color="textPrimary"
              variant="h1"
              className={classes.signUpTitle}
            >
              {/* Sign up to Financial */}
              {t("Sign Up To Financial")}
            </Typography>
            <FormControlSwitch
              checkedSwitch={checkedSwitch}
              toggleTheme={toggleTheme}
              className={classes.switchThemeToggle}
              label={t("Switch Theme")}
            />
            <SelectLanguage name="language" />
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
