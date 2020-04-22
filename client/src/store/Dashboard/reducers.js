import { DELETE_USER_SUCCESS } from "../actionTypes";

export const SET_USERS_PENDING = "SET_USERS_PENDING";
export const SET_USERS_SUCCESS = "SET_USERS_SUCCESS";
export const SET_USERS_ERROR = "SET_USERS_ERROR";

const initialState = {
  users: [],
  isLoading: false,
};

const DashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS_PENDING:
      return { ...state, isLoading: true };

    case SET_USERS_SUCCESS:
      return { ...state, users: payload, isLoading: false };
    case SET_USERS_ERROR:
      return { ...state, isLoading: false };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(({ _id }) => _id !== payload.id),
      };
    default:
      return state;
  }
};

export default DashboardReducer;
