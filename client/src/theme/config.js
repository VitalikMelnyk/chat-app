import {
  indigo,
  lime,
  blueGrey,
  lightGreen,
  deepPurple,
} from "@material-ui/core/colors";

const customStyles = {
  background: {
    default: "#383a4f",
    signupForm: "#3C3F58",
  },
};

export const createTheme = (themeType) => {
  const theme = {
    palette: {
      type: themeType,
      primary: themeType === "light" ? deepPurple : indigo,
      secondary: themeType === "light" ? lightGreen : lime,
      background: {
        default:
          themeType === "light"
            ? blueGrey[500]
            : customStyles.background.default,
        signupForm:
          themeType === "light"
            ? blueGrey[400]
            : customStyles.background.signupForm,
      },
    },
    typography: {
      fontFamily: 'Open Sans" sans-serif',
    },
  };

  return theme;
};
