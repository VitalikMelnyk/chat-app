import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import LoginFormik from "./components/LoginFormik";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
import { ModalMessage } from "../GeneralComponents/ModalMessage";
import { SERVER_URL } from "../../shared/constants";

const LoginPage = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [loginInfo, setLoginInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessLoginMessage, setIsSuccessLoginMessage] = useState(false);
  const [isFailureLoginMessage, setIsFailureLoginMessage] = useState(false);
  const [openModalMessage, setOpenModalMessage] = useState(false);

  const sendLoginData = latestData => {
    setLoginInfo(latestData);
    console.log(latestData);
    if (latestData) {
      axios
        .post(`${SERVER_URL}/login`, latestData)
        .then(res => {
          console.log(res);
          console.log(res.status);
          setLoginInfo({});
          setIsSuccessLoginMessage(true);
          // SET COOKIES
          if (res.status === 200) {
            Cookies.set("AccessToken", res.data.accessToken, {
              expires: new Date(res.data.expireDate * 1000)
            });
            Cookies.set("RefreshToken", res.data.refreshToken);
            let token = Cookies.get("AccessToken");
            if (!token) {
              console.log("Token is null");
            } else {
              // history.push("home");
              console.log("success");
            }
          }
        })
        .catch(err => {
          console.log(err.message);
          if (err.message === "Network Error") {
            setErrorMessage(
              err.message + ": You need to launch backend server"
            );
            setOpenModalMessage(true);
          } else if (err.response.status === 400) {
            setErrorMessage(err.response.data.message);
            setIsFailureLoginMessage(true);
          }
        });
    }
  };

  useEffect(() => {
    AOS.init();
  });
  return (
    <>
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
            <LoginFormik sendLoginData={sendLoginData} />
          </div>
        </Grid>
      </Grid>
      {openModalMessage && (
        <ModalMessage
          errorMessage={errorMessage}
          show={openModalMessage}
          handleClose={() => setOpenModalMessage(false)}
        />
      )}
      {isSuccessLoginMessage && (
        <SnackBarMessage
          duration={6000}
          severity="success"
          open={isSuccessLoginMessage}
          handleClose={() => setIsSuccessLoginMessage(false)}
          text="You are successful log in system!"
        />
      )}
      {isFailureLoginMessage && (
        <SnackBarMessage
          duration={null}
          severity="error"
          open={isFailureLoginMessage}
          handleClose={() => setIsFailureLoginMessage(false)}
          text={errorMessage}
        />
      )}
    </>
  );
};

export default LoginPage;
