import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { Button, ButtonGroup, Box } from "@material-ui/core";
import { FormControlText } from "../../GeneralComponents/FormFields";
import { LoginPageSchema } from "../../../utils/yupFormikValidation";
import { useStyles } from "../styles";

const LoginFormik = ({ sendLoginData }) => {
  const { t } = useTranslation();
  const classes = useStyles();

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
              // fullWidth={false}
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
              // fullWidth={false}
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

          <ButtonGroup classes={{ root: classes.loginBtn }}>
            <Box marginRight={2}>
              {props => (
                <Button
                  {...props}
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  disabled={!dirty}
                >
                  {t("Reset")}
                </Button>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!isValid || !dirty}
            >
              {t("Submit")}
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default LoginFormik;
