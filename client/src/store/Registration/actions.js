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
import {
  requestRegistration,
  requestCheckEmail,

} from "../../api/services/registration";

export const handleActiveStepNext = () => ({
  type: ACTIVE_STEP_INCREMENT
});

export const handleActiveStepBack = () => ({
  type: ACTIVE_STEP_DECRAMENT
});

export const handleActiveStepReset = payload => ({
  type: ACTIVE_STEP_RESET,
  payload
});
export const handleRegistrationPending = () => ({
  type: SEND_REGISTRATION_DATA_PENDING
});

export const handleRegistrationSuccess = () => ({
  type: SEND_REGISTRATION_DATA_SUCCESS
});

export const handleRegistrationError = () => ({
  type: SEND_REGISTRATION_DATA_ERROR
});

export const checkEmaiilPending = () => ({
  type: CHECK_EXIST_EMAIL_AND_SEND_DATA_PENDING
});
export const checkEmaiilSuccess = () => ({
  type: CHECK_EXIST_EMAIL_AND_SEND_DATA_SUCCESS
});

export const checkEmaiilError = () => ({
  type: CHECK_EXIST_EMAIL_AND_SEND_DATA_ERROR
});

export const checkEmailAndSendData = email => async dispatch => {
  dispatch(checkEmaiilPending());
  try {
    const response = await requestCheckEmail({ email });
    dispatch(checkEmaiilSuccess());
    const { status } = response;
    return status;
  } catch (error) {
    dispatch(checkEmaiilError());
    throw error;
  }
};

export const sendRegisterData = latestData => async dispatch => {
  dispatch(handleRegistrationPending());
  try {
    const response = await requestRegistration(latestData);
    dispatch(handleRegistrationSuccess());
    const { status } = response;
    return status;
  } catch (error) {
    dispatch(handleRegistrationError());
    throw error;
  }
};
