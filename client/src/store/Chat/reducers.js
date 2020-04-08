import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  ADD_ROOM_SUCCESS,
  DELETE_ROOM_SUCCESS,
  GET_ROOM_ERROR,
  GET_ROOM_PENDING,
  GET_ROOM_SUCCESS,
  UPDATE_ROOM_MESSAGES,
} from "../actionTypes";

const initialState = {
  rooms: [],
  currentRoom: {},
  isLoadingRooms: false,
  isLoadingRoom: false,
};

const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROOMS_PENDING:
      return { ...state, isLoadingRooms: true };
    case GET_ROOMS_SUCCESS:
      return { ...state, isLoadingRooms: false, rooms: payload };
    case GET_ROOMS_ERROR:
      return { ...state, isLoadingRooms: false };
    case GET_ROOM_PENDING:
      return { ...state, isLoadingRoom: true };
    case GET_ROOM_SUCCESS:
      return { ...state, isLoadingRoom: false, currentRoom: payload };
    case GET_ROOM_ERROR:
      return { ...state, isLoadingRoom: false };
    case ADD_ROOM_SUCCESS:
      return { ...state, rooms: [...state.rooms, payload] };
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.filter(({ _id }) => _id !== payload._id),
      };
    case UPDATE_ROOM_MESSAGES:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: [...state.currentRoom.messages, payload],
        },
      };
    default:
      return state;
  }
};

export default ChatReducer;
