import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = ({ signedIn }) => {
  return signedIn ? <Navigate to="/" /> : <Outlet />;
};
export default LoginRoute;
