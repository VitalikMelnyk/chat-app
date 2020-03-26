import axios from "axios";
import Cookies from "js-cookie";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    Cookies.remove("AccessToken");
    Cookies.remove("RefreshToken");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const setTokenToCookies = ({
  accessToken,
  refreshToken,
  expireDate
}) => {
  // SET COOKIES
  Cookies.set("AccessToken", accessToken, {
    expires: new Date(expireDate * 1000)
  });
  Cookies.set("RefreshToken", refreshToken);
};
