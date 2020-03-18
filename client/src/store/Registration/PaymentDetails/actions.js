import {
  SET_PAYMENT_FIELD,
  SET_PAYMENT_ERRORS,
  RESET_PAYMENT_STEP
} from "../../actionTypes";
export const setPaymentField = payload => ({
  type: SET_PAYMENT_FIELD,
  payload
});

export const setPaymentErrors = payload => ({
  type: SET_PAYMENT_ERRORS,
  payload
});

export const resetPaymentStep = payload => ({
  type: RESET_PAYMENT_STEP,
  payload
});
