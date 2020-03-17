import {
  indigo,
  lime,
  blueGrey,
  lightGreen,
  deepPurple
} from "@material-ui/core/colors";

const customStyles = {
  background: {
    default: "#383a4f",
    signupForm: "#3C3F58"
  }
};
// const ownStyleDark = {
//   main: "#00f1ff",
//   dark: "#00becc",
//   light: "#70ffff"
// };
// const ownStyleLight = {
//   main: "#be84ff",
//   dark: "#8b56cb",
//   light: "#f3b5ff"
// };

export const createTheme = themeType => {
  const theme = {
    palette: {
      type: themeType,
      primary: themeType === "light" ? deepPurple : indigo,
      secondary: themeType === "light" ? lightGreen : lime,
      // ownStyle: themeType === "light" ? ownStyleLight : ownStyleDark,
      background: {
        default:
          themeType === "light"
            ? blueGrey[500]
            : customStyles.background.default,
        signupForm:
          themeType === "light"
            ? blueGrey[400]
            : customStyles.background.signupForm
      }
    },
    typography: {
      fontFamily: 'Open Sans" sans-serif'
      //   fontFamily: '"Sen" sans-serif'
    }
  };

  return theme;
};
