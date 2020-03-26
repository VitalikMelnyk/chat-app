import {
  SEND_LOGIN_DATA_PENDING,
  SEND_LOGIN_DATA_SUCCESS,
  SEND_LOGIN_DATA_ERROR,
  SET_IS_AUTHENTICATED,
  CURRENT_USER_INFO_SUCCESS,
  CURRENT_USER_INFO_ERROR,
  CURRENT_USER_INFO_PENDING
} from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  currentUserInfo: {},
  isLoading: false
};

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: payload };
    case SEND_LOGIN_DATA_PENDING:
      return { ...state, isLoading: true };
    case SEND_LOGIN_DATA_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true };
    case SEND_LOGIN_DATA_ERROR:
      return { ...state, isLoading: false };
    case CURRENT_USER_INFO_PENDING:
      return { ...state };
    case CURRENT_USER_INFO_SUCCESS:
      return { ...state, currentUserInfo: payload };
    case CURRENT_USER_INFO_ERROR:
      return { ...state };
    default:
      return state;
  }
};

export default LoginReducer;
