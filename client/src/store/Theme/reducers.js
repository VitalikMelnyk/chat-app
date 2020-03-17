import { SET_THEME_TYPE } from "../actionTypes";

const initialState = {
  checkedSwitch: false,
  themeType: "dark"
};

export const ThemeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_THEME_TYPE:
      return {
        ...state,
        themeType: payload.newThemeType,
        checkedSwitch: !payload.checkedSwitch
      };

    default:
      return state;
  }
};
