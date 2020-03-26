import axios from "axios";
import {
  SET_USER_INFO,
  REMOVE_USER_INFO,
  SEND_LOGIN_DATA_PENDING,
  SEND_LOGIN_DATA_SUCCESS,
  SEND_LOGIN_DATA_ERROR
} from "../actionTypes";
import { SERVER_URL } from "../../shared/constants";

export const setCurrentUserInfo = payload => ({
  type: SET_USER_INFO,
  payload
});

export const removeCurrentUserInfo = payload => ({
  type: REMOVE_USER_INFO,
  payload
});

export const handlePending = actionType => ({
  type: actionType
});

export const handleSuccess = actionType => ({
  type: actionType
});

export const handleError = actionType => ({
  type: actionType
});

export const sendLoginData = (latestData, route) => async dispatch => {
  dispatch(handlePending(SEND_LOGIN_DATA_PENDING));
  try {
    const response = await axios.post(`${SERVER_URL}/${route}`, latestData);
    console.log(response);
    dispatch(handleSuccess(SEND_LOGIN_DATA_SUCCESS));

    return response;
  } catch (error) {
    dispatch(handleError(SEND_LOGIN_DATA_ERROR));
    throw error;
  }
};
