import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import AppProviders from "./components/Providers/AppProviders";
import PrivateRoute from "./components/GeneralComponents/PrivateRoute";
import NavigationPanel from "./components/NavigationPanel";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Registration from "./components/Registration";
import LoginPage from "./components/Login";
import Chat from "./components/Chat";

const App = () => {
  return (
    <AppProviders>
      <Router>
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
          <PrivateRoute path="/chat" component={Chat} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </AppProviders>
  );
};

export default App;
