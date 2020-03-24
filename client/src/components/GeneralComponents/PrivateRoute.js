import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   const { LoginReducer } = useSelector(state => state);
  //   const { isAuthenticated } = LoginReducer;
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
