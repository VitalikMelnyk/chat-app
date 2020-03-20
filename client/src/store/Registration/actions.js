import axios from "axios";
import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  SEND_DATA,
  SET_FORM_FIELDS,
  ACTIVE_STEP_RESET
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

export const setFormFields = payload => ({
  type: SET_FORM_FIELDS,
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
