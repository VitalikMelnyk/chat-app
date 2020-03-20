import axios from "axios";
import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  ADD_DATA_TO_ALL_INFORMATION,
  RESET_ALL_FORM,
  SEND_DATA,
  SET_FORM_ERRORS,
  SET_FORM_FIELDS,
  RESET_STEP
} from "../actionTypes";
import { SERVER_URL } from "../../shared/constants";

export const handleActiveStepNext = payload => ({
  type: ACTIVE_STEP_INCREMENT
});

export const handleActiveStepBack = payload => ({
  type: ACTIVE_STEP_DECRAMENT
});

export const handleResetAllForm = payload => ({
  type: RESET_ALL_FORM
});

export const resetStep = payload => ({
  type: RESET_STEP,
  payload
});

export const setFormFields = payload => ({
  type: SET_FORM_FIELDS,
  payload
});
export const setFormErrors = payload => ({
  type: SET_FORM_ERRORS,
  payload
});

export const addDataToAllInformation = payload => ({
  type: ADD_DATA_TO_ALL_INFORMATION,
  payload
});

export const actionCreator = (type, action, dispatch) => {
  dispatch({ type: `${type}_PENDING` });
  action
    .then(res => {
      console.log(res);
      dispatch({ type: `${type}_SUCCESS`, payload: res });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: `${type}_ERROR`, payload: err });
    });
};

export const sendData = data => {
  const action = axios.post(`${SERVER_URL}/register`, data);
  return dispatch => actionCreator(SEND_DATA, action, dispatch);
};
