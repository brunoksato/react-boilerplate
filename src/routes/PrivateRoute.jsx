import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { get } from "lodash";
import { auth as useAuth } from "../hooks/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth, cachedAuth } = useAuth();
  const isAuth =
    !!get(auth, "token", false) || !!get(cachedAuth, "token", false);

  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/entrar" />
      }
    />
  );
};

export default withRouter(PrivateRoute);
