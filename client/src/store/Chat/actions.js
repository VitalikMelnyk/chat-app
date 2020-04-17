import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  DELETE_ROOM_SUCCESS,
  ADD_ROOM_SUCCESS,
} from "../actionTypes";
import {
  getRooms,
  addRoom,
  deleteRoom,
} from "../../api/services/chat";
// GET ROOMS
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
// Add room
export const createRoomSuccess = (payload) => ({
  type: ADD_ROOM_SUCCESS,
  payload,
});
export const createRoom = (room) => async (dispatch) => {
  try {
    const response = await addRoom(room);
    dispatch(createRoomSuccess(response.data.newRoom));
    return response;
  } catch (error) {
    throw error;
  }
};
// Delete room
export const deleteRoomSuccess = (payload) => ({
  type: DELETE_ROOM_SUCCESS,
  payload,
});
export const removeRoom = (id) => async (dispatch) => {
  try {
    const response = await deleteRoom(id);
    dispatch(deleteRoomSuccess(response.data.deletedRoom));
    return response;
  } catch (error) {
    throw error;
  }
};

