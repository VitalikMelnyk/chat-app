import { SET_USER_INFO, REMOVE_USER_INFO } from "../actionTypes";

export const setCurrentUserInfo = payload => ({
  type: SET_USER_INFO,
  payload
});

export const removeCurrentUserInfo = payload => ({
  type: REMOVE_USER_INFO,
  payload
});
