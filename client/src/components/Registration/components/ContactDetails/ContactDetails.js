import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import { useStyles } from "../../styles";
import { Button, CircularProgress } from "@material-ui/core";
import {
  FormControlDate,
  FormControlText
} from "../../../GeneralComponents/FormFields";
import { FormTitle } from "../../../GeneralComponents/FormTitle";
import { SelectAutocompleteCountry } from "./components/SelectAutocompleteCountry";
import { ModalMessage } from "../../../GeneralComponents/ModalMessage";
import { ContactDetailsSchema } from "../../../../utils/yupFormikValidation";

const ContactDetails = ({
  formTitle,
  handleSubmitData,
  handleBackStep,
  error
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { RegistrationReducer } = useSelector(state => state);
  const { isLoading } = RegistrationReducer;
  const handleSubmitting = fields => {
    handleSubmitData(fields, true);
  };
  return (
    <>
      <FormTitle formTitle={formTitle} />
      <Formik
        initialValues={{
          birthdayDate: null,
          telephoneNumber: "",
          country: {
            code: "",
            label: "",
            phone: ""
          },
          city: "",
          address: "",
          zipCode: ""
        }}
        validationSchema={ContactDetailsSchema}
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
          handleBlur,
          setFieldValue
        }) => {
          return (
            <Form className={classes.DetailsForm}>
              <div className={classes.credentialFields}>
                <FormControlText
                  name="city"
                  id="city"
                  label="City"
                  type="text"
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.city ? errors.city : ""}
                  error={touched.city && Boolean(errors.city)}
                />

                <FormControlText
                  name="telephoneNumber"
                  id="telephoneNumber"
                  label="Telephone Number"
                  type="text"
                  value={values.telephoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    touched.telephoneNumber ? errors.telephoneNumber : ""
                  }
                  error={
                    touched.telephoneNumber && Boolean(errors.telephoneNumber)
                  }
                />
              </div>
              <div className={classes.credentialFields}>
                <SelectAutocompleteCountry
                  name="country"
                  id="country"
                  label="Chooose a country"
                  setFieldValue={setFieldValue}
                  value={values.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    touched.country && touched.country.label
                      ? errors.country && errors.country.label
                      : ""
                  }
                  error={
                    touched.country &&
                    touched.country.label &&
                    Boolean(errors.country) &&
                    Boolean(errors.country.label)
                  }
                />
                <Field name="birthdayDate" component={FormControlDate} />
              </div>

              <div className={classes.credentialFields}>
                <FormControlText
                  name="address"
                  id="address"
                  label="Address"
                  type="text"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.address ? errors.address : ""}
                  error={touched.address && Boolean(errors.address)}
                />
                <FormControlText
                  maxLength={5}
                  name="zipCode"
                  id="zipCode"
                  label="Zip Code"
                  type="text"
                  value={values.zipCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.zipCode ? errors.zipCode : ""}
                  error={touched.zipCode && Boolean(errors.zipCode)}
                />
              </div>
              <div className={classes.contactBtn}>
                <div className={classes.contactBtnItem}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleReset}
                    disabled={!dirty}
                  >
                    {t("Reset")}
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBackStep}
                  >
                    {t("Back")}
                  </Button>
                </div>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isValid || !dirty || isLoading}
                  >
                    {t("Submit")}
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
          );
        }}
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

export default ContactDetails;
