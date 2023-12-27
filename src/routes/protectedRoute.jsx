import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return !localStorage.getItem(15) ? <Navigate to="/login" /> : <Outlet />;
};
export default ProtectedRoute;
