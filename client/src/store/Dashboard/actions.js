import {
  SET_USERS_PENDING,
  SET_USERS_SUCCESS,
  SET_USERS_ERROR
} from "./reducers";
import { getUsers } from "../../api/services/dashboard";

export const setUsersPending = () => ({
  type: SET_USERS_PENDING
});

export const setUsersSuccess = payload => ({
  type: SET_USERS_SUCCESS,
  payload
});

export const setUsersError = () => ({
  type: SET_USERS_ERROR
});

export const getAllUsers = () => async dispatch => {
  dispatch(setUsersPending());
  try {
    const response = await getUsers();
    console.log(response);
    dispatch(setUsersSuccess(response.data));
  } catch (error) {
    dispatch(setUsersError());
    throw error;
  }
};
