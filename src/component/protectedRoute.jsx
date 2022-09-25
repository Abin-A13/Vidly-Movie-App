import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    // To is make as obj so we can goto the formedit page. we use history to get state to path
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            ></Redirect>
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
