import { SET_LANGUAGE_APP } from "../actionTypes";

const initialState = {
  language: "en"
};

export const LocaleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LANGUAGE_APP:
      return { ...state, [payload.name]: payload.value };

    default:
      return state;
  }
};
