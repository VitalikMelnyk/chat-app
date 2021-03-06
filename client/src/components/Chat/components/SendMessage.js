import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { IconButton, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { FormControlText } from "../../GeneralComponents/FormFields";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "flex-end",
    margin: "20px 0",
  },
}));

const SendMessage = ({ onMessageSubmit, userTyping }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        message: "",
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
        handleBlur,
      }) => (
        <Form className={classes.form}>
          <FormControlText
            name="message"
            id="messsage"
            label={t("Enter the message")}
            type="text"
            required={false}
            value={values.message}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyUp={() => {
              userTyping();
            }}
            helperText={touched.message ? errors.message : ""}
            error={touched.message && Boolean(errors.message)}
          />
          <IconButton
            color="secondary"
            onClick={handleSubmit}
            disabled={!isValid || !dirty}
          >
            <SendIcon />
          </IconButton>
        </Form>
      )}
    </Formik>
  );
};

export default SendMessage;
