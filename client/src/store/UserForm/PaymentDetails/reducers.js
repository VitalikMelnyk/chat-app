import {
  SET_PAYMENT_FIELD,
  SET_PAYMENT_ERRORS,
  ACTIVE_STEP_DECRAMENT,
  ACTIVE_STEP_INCREMENT,
  RESET_ALL_FORM,
  RESET_PAYMENT_STEP
} from "../../actionTypes";

const initialState = {
  bankName: "",
  paymentType: "",
  holderName: "",
  cardNumber: "",
  cvcCode: "",
  errors: {}
};

export const PaymentDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_PAYMENT_FIELD:
      return { ...state, [payload.name]: payload.value };
    case SET_PAYMENT_ERRORS:
      return { ...state, errors: payload };
    case ACTIVE_STEP_INCREMENT:
      return { ...state, errors: {} };
    case ACTIVE_STEP_DECRAMENT:
      return { ...state, errors: {} };
    case RESET_PAYMENT_STEP:
      return initialState;
    case RESET_ALL_FORM:
      return initialState;
    default:
      return state;
  }
};
