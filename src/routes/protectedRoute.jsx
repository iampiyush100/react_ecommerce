import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ signedIn }) => {
  return signedIn ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
