import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};
export default PrivateRoute;
