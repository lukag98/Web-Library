import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminUser } from "../../utils";

const AdminRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user")) !== null;

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (!isAdminUser()) return <Navigate to="/books" />;

  return <Component {...rest} />;
};

export default AdminRoute;
