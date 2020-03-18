import {
  SET_PERSONAL_FIELD,
  SET_PERSONAL_ERRORS,
  ACTIVE_STEP_DECRAMENT,
  ACTIVE_STEP_INCREMENT,
  RESET_ALL_FORM,
  RESET_PERSONAL_STEP
} from "../../actionTypes";

const initialState = {
  firstName: "",
  secondName: "",
  gender: "",
  birthdayDate: new Date(),
  email: "",
  password: "",
  errors: {}
};

export const PersonalDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_PERSONAL_FIELD:
      return { ...state, [payload.name]: payload.value };
    case SET_PERSONAL_ERRORS:
      return { ...state, errors: payload };
    case ACTIVE_STEP_INCREMENT:
      return { ...state, errors: {} };
    case ACTIVE_STEP_DECRAMENT:
      return { ...state, errors: {} };
    case RESET_PERSONAL_STEP:
      return initialState;
    case RESET_ALL_FORM:
      return initialState;
    default:
      return state;
  }
};
