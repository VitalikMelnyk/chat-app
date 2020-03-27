import axios from "axios";
import {
  SET_USERS_PENDING,
  SET_USERS_SUCCESS,
  SET_USERS_ERROR
} from "./reducers";
import { SERVER_URL, GET_USERS } from "../../shared/constants";

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

export const getUsers = () => async dispatch => {
  dispatch(setUsersPending());
  try {
    const response = await axios.get(`${SERVER_URL}/${GET_USERS}`);
    dispatch(setUsersSuccess(response.data));
  } catch (error) {
    dispatch(setUsersError());
    throw error;
  }
};
