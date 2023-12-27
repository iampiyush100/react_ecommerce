import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = () => {
  return localStorage.getItem(15) ?  <Navigate to='/' /> : <Outlet />;
};
export default LoginRoute;
