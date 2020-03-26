import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const tokenIsAuth = Cookies.get("AccessToken");
  return (
    <Route
      {...rest}
      render={props =>
        tokenIsAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
