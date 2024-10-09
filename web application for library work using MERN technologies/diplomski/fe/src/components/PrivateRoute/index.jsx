import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user")) !== null;

  if (!isLoggedIn) return <Navigate to="/login" />;

  return <Component {...rest} />;
};

export default PrivateRoute;
