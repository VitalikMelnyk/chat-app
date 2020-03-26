import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { I18nextProvider } from "react-i18next";
import {
  MuiThemeProvider,
  StylesProvider,
  createMuiTheme,
  CssBaseline
} from "@material-ui/core";
import PrivateRoute from "./components/GeneralComponents/PrivateRoute";
import NavigationPanel from "./components/NavigationPanel";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import { createTheme } from "./theme/config";
import i18n from "./shared/i18n";
import LoginPage from "./components/Login/Login";

const App = () => {
  const { ThemeReducer } = useSelector(state => state);
  const { themeType } = ThemeReducer;
  const theme = createTheme(themeType);
  const muiTheme = createMuiTheme(theme);
  // console.log(muiTheme);
  // console.log(i18n);
  return (
    <div>
      <StylesProvider injectFirst>
        <I18nextProvider i18n={i18n}>
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <NavigationPanel />
            <Switch>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route path="/register">
                <Registration />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Redirect from="/" to="/home" />
            </Switch>
          </MuiThemeProvider>
        </I18nextProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
