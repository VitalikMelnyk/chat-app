import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
  ADD_ROOM_SUCCESS,
  DELETE_ROOM_SUCCESS,
} from "../actionTypes";

const initialState = {
  rooms: [],
  isLoading: false,
};

const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ROOMS_PENDING:
      return { ...state, isLoading: true };
    case GET_ROOMS_SUCCESS:
      return { ...state, isLoading: false, rooms: payload };
    case GET_ROOMS_ERROR:
      return { ...state, isLoading: false };
    case ADD_ROOM_SUCCESS:
      return { ...state, rooms: [...state.rooms, payload] };
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.filter(({ _id }) => _id !== payload._id),
      };
    default:
      return state;
  }
};

export default ChatReducer;
