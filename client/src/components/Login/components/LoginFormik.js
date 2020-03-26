import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { FormControlText } from "../../GeneralComponents/FormFields";
import { LoginPageSchema } from "../../../utils/yupFormikValidation";
import { useStyles } from "../styles";

const LoginFormik = ({ sendLoginData }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { LoginReducer } = useSelector(state => state);
  const { isLoading } = LoginReducer;

  const handleSubmitting = fields => {
    sendLoginData(fields);
    console.log(fields);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={LoginPageSchema}
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
        <Form className={classes.LoginForm}>
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
          </div>

          <div className={classes.loginBtn}>
            <div className={classes.loginBtnItem}>
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
      )}
    </Formik>
  );
};

export default LoginFormik;
