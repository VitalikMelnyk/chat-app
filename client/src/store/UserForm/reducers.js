import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  ADD_DATA_TO_ALL_INFORMATION,
  RESET_ALL_FORM,
} from "../actionTypes";

const initialState = {
  activeStep: -1,
  allUserInformation: {}
};

export const UserFormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVE_STEP_INCREMENT:
      return { ...state, activeStep: state.activeStep + 1 };
    case ACTIVE_STEP_DECRAMENT:
      return { ...state, activeStep: state.activeStep - 1 };
    case RESET_ALL_FORM:
      return initialState;
    case ADD_DATA_TO_ALL_INFORMATION:
      return {
        ...state,
        allUserInformation: { ...state.allUserInformation, ...payload }
      };
    
    default:
      return state;
  }
};

