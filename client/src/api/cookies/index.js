import Cookies from "js-cookie";

const ACCESS_TOKEN_NAME = "AccessToken";
const REFRESH_TOKEN_NAME = "RefreshToken";

export const setAuthenticationCookies = ({
  accessToken,
  refreshToken,
  expires
}) => {
  Cookies.set(ACCESS_TOKEN_NAME, accessToken, { expires });
  Cookies.set(REFRESH_TOKEN_NAME, refreshToken);
};

export const getAuthenticationCookies = () => ({
  accessToken: Cookies.get(ACCESS_TOKEN_NAME),
  refreshToken: Cookies.get(REFRESH_TOKEN_NAME)
});

export const clearAuthenticationCookies = () => {
  Cookies.remove(ACCESS_TOKEN_NAME);
  Cookies.remove(REFRESH_TOKEN_NAME);
};

export default {
  setAuthenticationCookies,
  getAuthenticationCookies,
  clearAuthenticationCookies
};
