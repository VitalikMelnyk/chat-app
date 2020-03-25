import { SET_USER_INFO, REMOVE_USER_INFO } from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  userInfo: {},
  loading: false
};

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO:
      return { ...state, isAuthenticated: true, userInfo: payload };
    case REMOVE_USER_INFO:
      return { ...state, isAuthenticated: false, userInfo: payload };
    default:
      return state;
  }
};

export default LoginReducer;
