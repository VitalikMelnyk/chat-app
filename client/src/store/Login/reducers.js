import {
  SEND_LOGIN_DATA_PENDING,
  SEND_LOGIN_DATA_SUCCESS,
  SEND_LOGIN_DATA_ERROR,
  CURRENT_USER_INFO_SUCCESS,
  CURRENT_USER_INFO_ERROR,
  CURRENT_USER_INFO_PENDING,
  LOGOUT_SUCCESS
} from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  currentUserInfo: {},
  isLoading: false
};

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default LoginReducer;
