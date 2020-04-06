import {
  GET_ROOMS_PENDING,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_ERROR,
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
    default:
      return state;
  }
};

export default ChatReducer;
