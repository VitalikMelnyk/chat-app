import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import AOS from "aos";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import LoginFormik from "./components/LoginFormik";
import { SnackBarMessage } from "../GeneralComponents/SnackBarMessage";
import { ModalMessage } from "../GeneralComponents/ModalMessage";
import { setCurrentUserInfo, sendLoginData } from "../../store/Login/actions";
import { setAuthToken } from "../../shared/functions";
import { LOGIN_ROUTE } from "../../shared/constants";

const LoginPage = ({ sendLoginData }) => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [loginInfo, setLoginInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessLoginMessage, setIsSuccessLoginMessage] = useState(false);
  const [isFailureLoginMessage, setIsFailureLoginMessage] = useState(false);
  const [openModalMessage, setOpenModalMessage] = useState(false);

  const { LoginReducer } = useSelector(state => state);
  const dispatch = useDispatch();
  const sendAuthData = async latestData => {
    setLoginInfo(latestData);
    console.log(latestData);
    try {
      const success = await sendLoginData(latestData, LOGIN_ROUTE);
      console.log(success);
      if (success.status === 200) {
        setLoginInfo({});
        setIsSuccessLoginMessage(true);
        // SET COOKIES
        const { accessToken, refreshToken, expireDate } = success.data;
        Cookies.set("AccessToken", accessToken, {
          expires: new Date(expireDate * 1000)
        });
        Cookies.set("RefreshToken", refreshToken);
        let token = Cookies.get("AccessToken");
        setAuthToken(accessToken);
        // Decode token to get user data
        const decoded = jwt_decode(accessToken);
        console.log(decoded);
        dispatch(setCurrentUserInfo(decoded));
        if (!token) {
          console.log("Token is null");
        } else {
          history.push("dashboard");
          console.log("success");
        }
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
const mapDispatch = { sendLoginData };

// export default Registration;
export default connect(null, mapDispatch)(LoginPage);
