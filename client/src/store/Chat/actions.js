import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  GET_ROOM_PENDING,
  GET_ROOM_SUCCESS,
  GET_ROOM_ERROR,
  DELETE_ROOM_SUCCESS,
  ADD_ROOM_SUCCESS,
  UPDATE_ROOM_MESSAGES,
} from "../actionTypes";
import {
  getRooms,
  addRoom,
  deleteRoom,
  getRoom,
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

// GET ROOM
export const getRoomPending = () => ({
  type: GET_ROOM_PENDING,
});
export const getRoomSuccess = (payload) => ({
  type: GET_ROOM_SUCCESS,
  payload,
});
export const getRoomError = () => ({
  type: GET_ROOM_ERROR,
});
export const getCurrentRoom = (roomId) => async (dispatch) => {
  dispatch(getRoomPending());
  try {
    const response = await getRoom(roomId);
    console.log(response);
    dispatch(getRoomSuccess(response.data));
  } catch (error) {
    dispatch(getRoomError());
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

// Update current room
export const updateRoomMessage = (payload) => ({
  type: UPDATE_ROOM_MESSAGES,
  payload,
});
