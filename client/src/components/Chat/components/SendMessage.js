import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { FormControlText } from "../../GeneralComponents/FormFields";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    alignItems: "flex-end",
    margin: "20px 0"
  }
}));

const SendMessage = ({ onMessageSubmit }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        message: ""
      }}
      onSubmit={({ message }, actions) => {
        onMessageSubmit(message);
        actions.resetForm();
      }}
    >
      {({
        errors,
        isValid,
        touched,
        handleSubmit,
        dirty,
        values,
        handleChange,
        handleBlur
      }) => (
        <Form className={classes.form}>
          <FormControlText
            name="message"
            id="messsage"
            label="Enter the message"
            type="text"
            required={false}
            value={values.message}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={touched.message ? errors.message : ""}
            error={touched.message && Boolean(errors.message)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isValid || !dirty}
          >
            {t("Submit")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SendMessage;
