import {
  SET_USERS_PENDING,
  SET_USERS_SUCCESS,
  SET_USERS_ERROR,
} from "./reducers";
import { getUsers, deleteUser } from "../../api/services/users";
import { DELETE_USER_SUCCESS } from "../actionTypes";

export const setUsersPending = () => ({
  type: SET_USERS_PENDING,
});

export const setUsersSuccess = (payload) => ({
  type: SET_USERS_SUCCESS,
  payload,
});

export const setUsersError = () => ({
  type: SET_USERS_ERROR,
});

export const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: { id },
});

export const getAllUsers = () => async (dispatch) => {
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

export const deleteCurrentUser = ({ _id }) => async (dispatch) => {
  try {
    await deleteUser(_id);
    dispatch(deleteUserSuccess(_id));
  } catch (error) {
    throw error;
  }
};

