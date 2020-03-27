import axios from "axios";
import {
  SET_IS_AUTHENTICATED,
  SEND_LOGIN_DATA_PENDING,
  SEND_LOGIN_DATA_SUCCESS,
  SEND_LOGIN_DATA_ERROR,
  CURRENT_USER_INFO_PENDING,
  CURRENT_USER_INFO_ERROR,
  CURRENT_USER_INFO_SUCCESS
} from "../actionTypes";
import { SERVER_URL } from "../../shared/constants";
import { login, logout } from "../../api/services/authentication";

export const setCurrentUserPending = () => ({
  type: CURRENT_USER_INFO_PENDING
});

export const setCurrentUserSuccess = payload => ({
  type: CURRENT_USER_INFO_SUCCESS,
  payload
});
export const setCurrentUserError = () => ({
  type: CURRENT_USER_INFO_ERROR
});

export const setIsAuthenticated = payload => ({
  type: SET_IS_AUTHENTICATED,
  payload
});

export const handleLoginPending = () => ({
  type: SEND_LOGIN_DATA_PENDING
});
export const handleLoginSuccess = () => ({
  type: SEND_LOGIN_DATA_SUCCESS
});
export const handleLoginError = () => ({
  type: SEND_LOGIN_DATA_ERROR
});


export const getCurrentUserInfo = route => async dispatch => {
  dispatch(setCurrentUserPending());
  try {
    const response = await axios.get(`${SERVER_URL}/${route}`);
    dispatch(setCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(setCurrentUserError());
    throw error;
  }
};

export const doLogin = fields => async dispatch => {
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

export const doLogout = () => dispatch => logout();
