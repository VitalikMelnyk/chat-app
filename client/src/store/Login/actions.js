import {
  SEND_LOGIN_DATA_PENDING,
  SEND_LOGIN_DATA_SUCCESS,
  SEND_LOGIN_DATA_ERROR,
  CURRENT_USER_INFO_PENDING,
  CURRENT_USER_INFO_ERROR,
  CURRENT_USER_INFO_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actionTypes";

import { login, logout } from "../../api/services/authentication";
import { getCurrentUser } from "../../api/services/users";

export const setCurrentUserPending = () => ({
  type: CURRENT_USER_INFO_PENDING,
});

export const setCurrentUserSuccess = (payload) => ({
  type: CURRENT_USER_INFO_SUCCESS,
  payload,
});
export const setCurrentUserError = () => ({
  type: CURRENT_USER_INFO_ERROR,
});

export const handleLoginPending = () => ({
  type: SEND_LOGIN_DATA_PENDING,
});
export const handleLoginSuccess = () => ({
  type: SEND_LOGIN_DATA_SUCCESS,
});
export const handleLoginError = () => ({
  type: SEND_LOGIN_DATA_ERROR,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const getCurrentUserInfo = () => async (dispatch) => {
  dispatch(setCurrentUserPending());
  try {
    const response = await getCurrentUser();
    dispatch(setCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(setCurrentUserError());
    throw error;
  }
};

export const doLogin = (fields) => async (dispatch) => {
  dispatch(handleLoginPending());
  try {
    const response = await login(fields);
    dispatch(handleLoginSuccess());
    return response;
  } catch (error) {
    dispatch(handleLoginError());
    throw error;
  }
};

export const doLogout = () => (dispatch) => {
  // clear authenticated cookies
  logout();

  // logged out
  dispatch(logoutSuccess());
};
