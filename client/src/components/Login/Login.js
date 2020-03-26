import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import LoginFormik from "./components/LoginFormik";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
import { ModalMessage } from "../GeneralComponents/ModalMessage";
import {
  sendLoginData,
  setIsAuthenticated,
  getCurrentUserInfo
} from "../../store/Login/actions";
import { setAuthToken, setTokenToCookies } from "../../shared/functions";
import { LOGIN_ROUTE, GET_CURRENT_USER } from "../../shared/constants";


const LoginPage = ({
  sendLoginData,
  setIsAuthenticated,
  getCurrentUserInfo
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [loginInfo, setLoginInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessLoginMessage, setIsSuccessLoginMessage] = useState(false);
  const [isFailureLoginMessage, setIsFailureLoginMessage] = useState(false);
  const [openModalMessage, setOpenModalMessage] = useState(false);

  const sendAuthData = async latestData => {
    setLoginInfo(latestData);
    console.log(latestData);
    try {
      const loginResponse = await sendLoginData(latestData, LOGIN_ROUTE);
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        const { accessToken } = loginResponse.data;
        setLoginInfo({});
        setIsSuccessLoginMessage(true);
        setTokenToCookies(loginResponse.data);
        setAuthToken(accessToken);
        setIsAuthenticated(true);
        await getCurrentUserInfo(GET_CURRENT_USER);

        history.push("dashboard");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
      if (error.message === "Network Error") {
        setErrorMessage(error.message + ": You need to launch backend server");
        setOpenModalMessage(true);
      } else if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setIsFailureLoginMessage(true);
      }
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
            <LoginFormik sendLoginData={sendAuthData} />
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
// How to used useDispatch hook in redux-thunk?
const mapDispatch = { sendLoginData, setIsAuthenticated, getCurrentUserInfo };

// export default Registration;
export default connect(null, mapDispatch)(LoginPage);
