import React from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { useStyles } from "../../styles";
import { Button, ButtonGroup } from "@material-ui/core";

import { FormControlSelect, FormControlText } from "../FormFields";
import { FormTitle } from "../GeneralComponents/FormTitle";
import { PersonalDetailsSchema } from "../../../../utils/yupFormikValidation";

const PersonalDetails = ({ formTitle, handleNextStep, handleSubmitData }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleSubmitting = fields => {
    handleSubmitData(fields, false);
    // handleNextStep();
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
              {/* <Field name="birthdayDate" component={FormControlDate} /> */}
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
            <ButtonGroup classes={{ root: classes.personalDetailsBtn }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReset}
                disabled={!dirty}
              >
                {t("Reset")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isValid || !dirty}
              >
                {t("Next")}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PersonalDetails;
