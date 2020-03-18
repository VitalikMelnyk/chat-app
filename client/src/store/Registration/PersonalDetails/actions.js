import {
  SET_PERSONAL_FIELD,
  SET_PERSONAL_ERRORS,
  RESET_PERSONAL_STEP,
} from "../../actionTypes";

export const setPersonalField = payload => ({
  type: SET_PERSONAL_FIELD,
  payload
});

export const setPersonalErrors = payload => ({
  type: SET_PERSONAL_ERRORS,
  payload
});

export const resetPersonalStep = (payload) => ({
  type: RESET_PERSONAL_STEP,
  payload
})

