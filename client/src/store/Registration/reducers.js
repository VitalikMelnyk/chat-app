import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  RESET_ALL_FORM,
  SEND_DATA_PENDING,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
  SET_FORM_FIELDS,
  SET_FORM_ERRORS,
  RESET_STEP
} from "../actionTypes";

const initialState = {
  activeStep: 0,
  isLoading: false,
  error: null,
  registrationInfo: {
    firstName: "",
    secondName: "",
    gender: "",
    birthdayDate: new Date(),
    email: "",
    password: "",
    confirmPassword: "",
    telephoneNumber: "",
    country: null,
    city: "",
    address: "",
    zipCode: "",
    errors: {}
  }
};

export const RegistrationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ACTIVE_STEP_INCREMENT:
      return {
        ...state,
        activeStep: state.activeStep + 1
      };
    case ACTIVE_STEP_DECRAMENT:
      return { ...state, activeStep: state.activeStep - 1 };
    case SET_FORM_FIELDS: {
      return { ...state, registrationInfo: payload };
    }
    case SET_FORM_ERRORS: {
      return { ...state, registrationInfo: { ...state, payload } };
    }

    case RESET_ALL_FORM:
      return initialState;

    case SEND_DATA_PENDING: {
      return { ...state, isLoading: true };
    }
    case SEND_DATA_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case SEND_DATA_ERROR: {
      return { ...state, isLoading: false, error: payload };
    }
    default:
      return state;
  }
};
