import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  SEND_DATA_PENDING,
  SEND_DATA_SUCCESS,
  SEND_DATA_ERROR,
  ACTIVE_STEP_RESET,
  CHECK_EXIST_EMAIL_AND_SEND_DATA_PENDING,
  CHECK_EXIST_EMAIL_AND_SEND_DATA_SUCCESS,
  CHECK_EXIST_EMAIL_AND_SEND_DATA_ERROR
} from "../actionTypes";

const initialState = {
  activeStep: 0,
  isLoading: false
};

const RegistrationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVE_STEP_INCREMENT:
      return {
        ...state,
        activeStep: state.activeStep + 1
      };
    case ACTIVE_STEP_DECRAMENT:
      return { ...state, activeStep: state.activeStep - 1 };
    case ACTIVE_STEP_RESET: {
      return { ...state, activeStep: 0 };
    }

    case SEND_DATA_PENDING:
      return { ...state, isLoading: true };

    case SEND_DATA_SUCCESS:
      return { ...state, isLoading: false };

    case SEND_DATA_ERROR:
      return { ...state, isLoading: false };

    case CHECK_EXIST_EMAIL_AND_SEND_DATA_PENDING:
      return { ...state, isLoading: true };

    case CHECK_EXIST_EMAIL_AND_SEND_DATA_SUCCESS:
      return { ...state, isLoading: false };

    case CHECK_EXIST_EMAIL_AND_SEND_DATA_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default RegistrationReducer;
