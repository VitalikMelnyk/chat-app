import { post } from "../../request";
import {
  getAuthenticationCookies,
  setAuthenticationCookies,
  clearAuthenticationCookies,
} from "../../cookies";

const requestLogin = (credentials) => post("/login", { data: credentials });

export const login = async (fields) => {
  let authData = getAuthenticationCookies();
  if (
    fields.email ||
    fields.password ||
    !authData.accessToken ||
    !authData.refreshToken
  ) {
    authData = await requestLogin(fields);
    const { accessToken, refreshToken, expireDate } = authData.data;
    setAuthenticationCookies({
      accessToken,
      refreshToken,
      expires: expireDate ? new Date(expireDate * 1000) : undefined,
    });
  }
  return authData;
};

export const logout = () => {
  clearAuthenticationCookies();
};
