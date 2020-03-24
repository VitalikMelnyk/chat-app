import React, { useEffect } from "react";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import LoginFormik from "./components/LoginFormik";

const LoginPage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
  });
  return (
    <Grid container className={classes.root}>
      <Grid
        data-aos="zoom-in"
        item
        xs={12}
        sm={8}
        md={6}
        lg={5}
        className={classes.signInContainer}
      >
        <div className={classes.signInHeader}>
          <Typography
            color="secondary"
            variant="h1"
            className={classes.signInTitle}
          >
            {t("Sign In")}
          </Typography>
        </div>
        <div className={classes.signInMain}>
          <LoginFormik />
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
