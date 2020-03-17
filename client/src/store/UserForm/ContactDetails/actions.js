import {
  SET_CONTACT_FIELD,
  SET_CONTACT_ERRORS,
  RESET_CONTACT_STEP
} from "../../actionTypes";

export const setContactField = payload => ({
  type: SET_CONTACT_FIELD,
  payload
});
export const setContactErrors = payload => ({
  type: SET_CONTACT_ERRORS,
  payload
});

export const resetContactStep = payload => ({
  type: RESET_CONTACT_STEP,
  payload
});
