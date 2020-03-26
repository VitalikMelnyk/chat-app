import axios from "axios";
import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  ACTIVE_STEP_RESET,
  SEND_REGISTRATION_DATA_PENDING,
  SEND_REGISTRATION_DATA_ERROR,
  SEND_REGISTRATION_DATA_SUCCESS,
  CHECK_EXIST_EMAIL_AND_SEND_DATA_PENDING,
  CHECK_EXIST_EMAIL_AND_SEND_DATA_SUCCESS,
  CHECK_EXIST_EMAIL_AND_SEND_DATA_ERROR
} from "../actionTypes";
import { SERVER_URL } from "../../shared/constants";

export const handleActiveStepNext = payload => ({
  type: ACTIVE_STEP_INCREMENT
});

export const handleActiveStepBack = payload => ({
  type: ACTIVE_STEP_DECRAMENT
});

export const handleActiveStepReset = payload => ({
  type: ACTIVE_STEP_RESET,
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

export const sendRegisterData = (latestData, route) => async dispatch => {
  dispatch(handlePending(SEND_REGISTRATION_DATA_PENDING));
  try {
    const response = await axios.post(`${SERVER_URL}/${route}`, latestData);
    console.log(response);
    dispatch(handleSuccess(SEND_REGISTRATION_DATA_SUCCESS));
    const { status } = response;
    return status;
  } catch (error) {
    dispatch(handleError(SEND_REGISTRATION_DATA_ERROR));
    throw error;
  }
};

export const checkEmailAndSendData = (email, route) => async dispatch => {
  dispatch(handlePending(CHECK_EXIST_EMAIL_AND_SEND_DATA_PENDING));
  try {
    const response = await axios.post(`${SERVER_URL}/${route}`, {
      email: email
    });
    console.log(response);
    dispatch(handleSuccess(CHECK_EXIST_EMAIL_AND_SEND_DATA_SUCCESS));
    const { status } = response;
    return status;
  } catch (error) {
    dispatch(handleError(CHECK_EXIST_EMAIL_AND_SEND_DATA_ERROR));
    throw error;
  }
};
