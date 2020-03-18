import {
  SET_CONTACT_FIELD,
  SET_CONTACT_ERRORS,
  ACTIVE_STEP_DECRAMENT,
  ACTIVE_STEP_INCREMENT,
  RESET_ALL_FORM,
  RESET_CONTACT_STEP
} from "../../actionTypes";

const initialState = {
  telephoneNumber: "",
  country: null,
  city: "",
  address: "",
  zipCode: "",
  errors: {}
};

export const ContactDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_CONTACT_FIELD:
      return { ...state, [payload.name]: payload.value };
    case SET_CONTACT_ERRORS:
      return { ...state, errors: payload };
    case ACTIVE_STEP_INCREMENT:
      return { ...state, errors: {} };
    case ACTIVE_STEP_DECRAMENT:
      return { ...state, errors: {} };
    case RESET_CONTACT_STEP:
      return initialState;
    case RESET_ALL_FORM:
      return initialState;
    default:
      return state;
  }
};
