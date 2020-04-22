import React from "react";
import { useSelector } from "react-redux";
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@material-ui/core";
import { createTheme } from "../../theme/config";

const ThemeProvider = ({ children }) => {
  const { ThemeReducer } = useSelector((state) => state);
  const { themeType } = ThemeReducer;
  const theme = createTheme(themeType);
  const muiTheme = createMuiTheme(theme);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline>{children}</CssBaseline>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
