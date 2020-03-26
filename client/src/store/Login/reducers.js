import {
  SET_USER_INFO,
  REMOVE_USER_INFO,
  SEND_LOGIN_DATA_PENDING,
  SEND_LOGIN_DATA_SUCCESS,
  SEND_LOGIN_DATA_ERROR
} from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  isLoading: false
};

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return { ...state, isAuthenticated: true, userInfo: payload };
    case REMOVE_USER_INFO:
      return { ...state, isAuthenticated: false, userInfo: payload };
    case SEND_LOGIN_DATA_PENDING:
      return { ...state, isLoading: true };
    case SEND_LOGIN_DATA_SUCCESS:
      return { ...state, isLoading: false };
    case SEND_LOGIN_DATA_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default LoginReducer;
