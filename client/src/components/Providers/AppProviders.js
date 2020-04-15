import React from "react";
import { StylesProvider } from "@material-ui/core";
import ThemeProvider from "../Theme/ThemeProvider";
import LocaleProvider from "../Locale/LocaleProvider";

const AppProviders = ({ children }) => (
  <ThemeProvider>
    <StylesProvider injectFirst>
      <LocaleProvider>{children}</LocaleProvider>
    </StylesProvider>
  </ThemeProvider>
);

export default AppProviders;
