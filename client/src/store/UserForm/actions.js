import {
  ACTIVE_STEP_INCREMENT,
  ACTIVE_STEP_DECRAMENT,
  ADD_DATA_TO_ALL_INFORMATION,
  RESET_ALL_FORM,
} from "../actionTypes";

export const handleActiveStepNext = payload => ({
  type: ACTIVE_STEP_INCREMENT
});

export const handleActiveStepBack = payload => ({
  type: ACTIVE_STEP_DECRAMENT
});

export const handleResetAllForm = payload => ({
  type: RESET_ALL_FORM
});

export const addDataToAllInformation = payload => ({
  type: ADD_DATA_TO_ALL_INFORMATION,
  payload
});

