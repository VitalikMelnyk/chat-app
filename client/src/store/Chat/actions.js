import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
} from "../actionTypes";
import { getRooms } from "../../api/services/chat";

export const getRoomsPending = () => ({
  type: GET_ROOMS_PENDING,
});

export const getRoomsSuccess = (payload) => ({
  type: GET_ROOMS_SUCCESS,
  payload,
});

export const getRoomsError = () => ({
  type: GET_ROOMS_ERROR,
});

export const getAllRooms = () => async (dispatch) => {
  dispatch(getRoomsPending());
  try {
    const response = await getRooms();
    console.log(response);
    dispatch(getRoomsSuccess(response.data));
  } catch (error) {
    dispatch(getRoomsError());
    throw error;
  }
};
