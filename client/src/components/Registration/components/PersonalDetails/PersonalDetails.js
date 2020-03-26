import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { useStyles } from "../../styles";
import { Button, CircularProgress } from "@material-ui/core";
import { ModalMessage } from "../../../GeneralComponents/ModalMessage";
import {
  FormControlSelect,
  FormControlText
} from "../../../GeneralComponents/FormFields";
import { FormTitle } from "../../../GeneralComponents/FormTitle";
import { PersonalDetailsSchema } from "../../../../utils/yupFormikValidation";

const PersonalDetails = ({ formTitle, handleSubmitData, error }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { RegistrationReducer } = useSelector(state => state);
  const { isLoading } = RegistrationReducer;

  const handleSubmitting = fields => {
    handleSubmitData(fields, false);
  };
  return (
    <>
      <FormTitle formTitle={formTitle} />
      <Formik
        initialValues={{
          firstName: "",
          secondName: "",
          gender: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={PersonalDetailsSchema}
        onSubmit={handleSubmitting}
      >
        {({
          errors,
          isValid,
          touched,
          handleSubmit,
          handleReset,
          dirty,
          values,
          handleChange,
          handleBlur
        }) => (
          <Form className={classes.DetailsForm}>
            <div className={classes.credentialFields}>
              <FormControlText
                name="firstName"
                id="firstName"
                label="First Name"
                type="text"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.firstName ? errors.firstName : ""}
                error={touched.firstName && Boolean(errors.firstName)}
              />
              <FormControlText
                name="secondName"
                id="secondName"
                label="Second Name"
                type="text"
                value={values.secondName}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.secondName ? errors.secondName : ""}
                error={touched.secondName && Boolean(errors.secondName)}
              />
              <FormControlSelect
                idName="gender"
                value={values.gender}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.gender ? errors.gender : ""}
                error={touched.gender && Boolean(errors.gender)}
              />
            </div>
            <div className={classes.credentialFields}>
              <FormControlText
                name="email"
                id="email"
                label="Email"
                type="text"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
              />
            </div>
            <div className={classes.credentialFields}>
              <FormControlText
                name="password"
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
              />
              <FormControlText
                name="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={
                  touched.confirmPassword ? errors.confirmPassword : ""
                }
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
              />
            </div>
            <div className={classes.contactBtn}>
              <div className={classes.contactBtnItem}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  disabled={!dirty}
                >
                  {t("Reset")}
                </Button>
              </div>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isValid || !dirty || isLoading}
                >
                  {t("Next")}
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {error.openModalMessage && (
        <ModalMessage
          errorMessage={error.errorMessage}
          show={error.openModalMessage}
          handleClose={error.handleCloseModalMessage}
        />
      )}
    </>
  );
};

export default PersonalDetails;
